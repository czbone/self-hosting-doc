import fs from 'node:fs';
import path from 'node:path';
import wikiLinkPlugin, { defaultUrlResolver } from '@flowershow/remark-wiki-link';

const DOCS_ROOT = 'src/content/docs';
const MARKDOWN_FILE_PATTERN = /\.(mdx?|md)$/;

function walkDir(fullPath) {
	return fs.statSync(fullPath).isFile() ? fullPath : getAllFilesRecursively(fullPath);
}

function getAllFilesRecursively(folder) {
	return fs.readdirSync(folder).flatMap((entry) => walkDir(path.join(folder, entry)));
}

function getDocsFiles() {
	const contentRoot = path.join(process.cwd(), DOCS_ROOT);
	return getAllFilesRecursively(contentRoot).map((file) =>
		file.slice(contentRoot.length + 1).replace(/\\/g, '/'),
	);
}

function toStarlightUrl(permalink) {
	return permalink ? `/${permalink}/` : '/';
}

/** Starlight 向け wiki リンク remark プラグイン */
export default function remarkWikiLinkStarlight() {
	wikiLinkPlugin.call(this, {
		format: 'shortestPossible',
		files: getDocsFiles(),
		urlResolver: ({ filePath, heading, isEmbed }) => {
			const resolved = defaultUrlResolver({ filePath, heading, isEmbed });

			if (isEmbed) {
				return toStarlightUrl(resolved.replace(MARKDOWN_FILE_PATTERN, ''));
			}

			if (resolved.startsWith('#')) {
				return resolved;
			}

			const hashIndex = resolved.indexOf('#');
			const pathPart = hashIndex >= 0 ? resolved.slice(0, hashIndex) : resolved;
			const hashPart = hashIndex >= 0 ? resolved.slice(hashIndex) : '';
			const permalink = pathPart.replace(/^\//, '');

			return `${toStarlightUrl(permalink)}${hashPart}`;
		},
	});
}
