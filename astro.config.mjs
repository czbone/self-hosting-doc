// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import starlight from '@astrojs/starlight';
import starlightThemeGalaxy from 'starlight-theme-galaxy';
import { loadEnv } from 'vite';
import wikiLinkPlugin from './src/remark/remark-wiki-link-starlight.mjs';

const gaId = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), '')
	.PUBLIC_GA_MEASUREMENT_ID;

// https://astro.build/config
export default defineConfig({
	// GitHub Pages の設定(site は GitHub Pages の URL, base は GitHub Pages のベースパス)
	//site: 'https://czbone.github.io',
	site: 'https://magic3.org',
	//base: '/self-hosting-doc',
	integrations: [
		starlight({
			plugins: [starlightThemeGalaxy()],
			...(gaId
				? {
						head: [
							{
								tag: 'script',
								attrs: {
									async: true,
									src: `https://www.googletagmanager.com/gtag/js?id=${gaId}`,
								},
							},
							{
								tag: 'script',
								content: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');
`,
							},
						],
					}
				: {}),
			customCss: [
				'./src/styles/fonts.css',
				'./src/styles/hero.css',
				'./src/styles/cards.css',
				'./src/styles/content.css',
				'./src/styles/header.css',
			],

			title: 'セルフホスティングの細道',
			favicon: '/favicon.png',
			logo: {
				light: './src/assets/server_logo.png',
				dark: './src/assets/server_logo_dark.png',
				alt: 'セルフホスティングの細道のロゴ',
				replacesTitle: true,
			},
			locales: {
				root: {
					label: '日本語',
					lang: 'ja',
				},
			},
			//social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
			sidebar: [
				{
					label: 'Coolifyのインストール',
					items: [
						{
							label: 'VPS',
							items: [{ autogenerate: { directory: 'guides/vps' } }],
						},
						{
							label: 'Coolify',
							items: [{ autogenerate: { directory: 'guides/coolify' } }],
						},
					],
				},
				{
					label: 'リファレンス',
					items: [{ autogenerate: { directory: 'reference' } }],
				},
			],
		}),
	],
	markdown: {
		processor: unified({
			remarkPlugins: [wikiLinkPlugin],
		}),
	},
});
