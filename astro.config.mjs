// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import starlight from '@astrojs/starlight';
import starlightThemeGalaxy from 'starlight-theme-galaxy';
import wikiLinkPlugin from './src/remark/remark-wiki-link-starlight.mjs';

// https://astro.build/config
export default defineConfig({
	// GitHub Pages の設定(site は GitHub Pages の URL, base は GitHub Pages のベースパス)
	site: 'https://czbone.github.io',
	base: '/self-hosting-doc',
	integrations: [
		starlight({
			plugins: [starlightThemeGalaxy()],
			customCss: ['./src/styles/fonts.css', './src/styles/hero.css', './src/styles/cards.css'],
			title: 'セルフホスティングの細道',
			favicon: '/favicon.png',
			logo: {
				light: './src/assets/server_logo.png',
				dark: './src/assets/server_logo_dark.png',
				alt: 'セルフホスティングの細道ロゴ',
				replacesTitle: true,
			},
			locales: {
				root: {
					label: '日本語',
					lang: 'ja',
				},
			},
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
			sidebar: [
				{
					label: 'ガイド',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'サンプルガイド', slug: 'guides/example' },
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
