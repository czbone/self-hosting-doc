# セルフホスティングガイド

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

Astro + Starlight で構築した日本語ドキュメントサイトです。Obsidian 形式の wiki リンク（`[[...]]`）に対応しています。

## 主な機能

- **Starlight** — ドキュメントサイト向け Astro インテグレーション
- **starlight-theme-galaxy** — Galaxy テーマ
- **Wiki リンク** — `@flowershow/remark-wiki-link` による `[[ページ名]]` 構文のサポート
- **日本語 UI** — ロケールは `ja`（ルート）

## プロジェクト構成

```
.
├── public/                  # 静的ファイル（favicon など）
├── src/
│   ├── assets/              # 画像アセット
│   ├── content/
│   │   ├── docs/            # ドキュメント本体（.md / .mdx）
│   │   │   ├── guides/
│   │   │   ├── reference/
│   │   │   └── wiki-links/  # wiki リンクのサンプル
│   │   └── i18n/            # UI 文言の翻訳
│   ├── remark/
│   │   └── remark-wiki-link-starlight.mjs  # Starlight 向け wiki リンク設定
│   ├── styles/              # カスタム CSS
│   └── content.config.ts
├── astro.config.mjs
├── package.json
└── pnpm-workspace.yaml
```

`src/content/docs/` 以下の `.md` / `.mdx` ファイルが、そのパスに対応する URL として公開されます。

## Wiki リンク

Markdown 内で Obsidian 形式のリンクが使えます。

```markdown
[[guides/example]]
[[reference/example|リファレンスへ]]
[[wiki-links/target-a#インストール手順]]
```

詳細とサンプルは開発サーバー起動後、[/wiki-links/](http://localhost:4321/wiki-links/) を参照してください。

### 設定の概要

- プラグイン: `@flowershow/remark-wiki-link@3.4.0`
- アダプター: `src/remark/remark-wiki-link-starlight.mjs`（ファイル一覧の収集と Starlight 向け URL 変換）
- 登録: `astro.config.mjs` の `markdown.processor`（`@astrojs/markdown-remark` の `unified()`）

## コマンド

プロジェクトルートで実行します。

| コマンド | 説明 |
| :-- | :-- |
| `pnpm install` | 依存関係をインストール |
| `pnpm dev` | 開発サーバーを起動（`http://localhost:4321`） |
| `pnpm build` | 本番ビルド（出力: `./dist/`） |
| `pnpm preview` | ビルド結果をローカルでプレビュー |
| `pnpm astro ...` | Astro CLI（`astro add` など） |

## 参考リンク

- [Starlight ドキュメント](https://starlight.astro.build/)
- [Astro ドキュメント](https://docs.astro.build)
- [@flowershow/remark-wiki-link](https://github.com/flowershow/remark-wiki-link)
