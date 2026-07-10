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

## Google Analytics（GA4）

このサイトでは [Google Analytics 4](https://analytics.google.com/)（gtag.js）を利用しています。Starlight の `head` 設定（[`astro.config.mjs`](astro.config.mjs)）により、全ページの `<head>` にタグを注入します。

測定 ID が未設定の場合、タグは出力されません（ローカル開発時に意図せず計測しないため）。

### 本番（GitHub Pages）

GitHub Actions のビルド時に環境変数 `PUBLIC_GA_MEASUREMENT_ID` を渡します。値は **Repository secrets** に登録してください。

| 項目 | 値 |
| :-- | :-- |
| 登録場所 | GitHub リポジトリ → Settings → Secrets and variables → Actions → **Repository secrets** |
| Name | `GA_MEASUREMENT_ID` |
| Value | GA4 の測定 ID（`G-` で始まる文字列） |

[`deploy.yml`](.github/workflows/deploy.yml) では次のように参照しています。

```yaml
env:
  PUBLIC_GA_MEASUREMENT_ID: ${{ secrets.GA_MEASUREMENT_ID }}
```

`main` ブランチへ push すると再デプロイされ、生成された HTML に GA4 タグが含まれます。

> **注意:** Environment variables（`github-pages` 環境など）に登録しただけでは動作しません。タグの注入は `build` ジョブで行われ、ワークフローは **Repository secrets** の `secrets.GA_MEASUREMENT_ID` を参照するためです。Environment variables を使う場合は、`build` ジョブに `environment: github-pages` を追加し、`vars.GA_MEASUREMENT_ID` へ参照を変更する必要があります。

### ローカル開発

ローカルでタグの出力を確認する場合は、`.env.example` を `.env` にコピーし、測定 ID を設定します。

```bash
PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

その後、ビルドして確認します。

```bash
pnpm run build
pnpm run preview
```

`dist/index.html` の `<head>` に `googletagmanager.com/gtag/js` が含まれていれば成功です。`.env` は git 管理外（`.gitignore` 済み）です。

### 動作確認

1. 本番サイトのページソースで `googletagmanager.com/gtag/js` を検索する
2. ブラウザの開発者ツール → Network で GA4 への `collect` リクエストを確認する
3. [GA4 のリアルタイムレポート](https://analytics.google.com/) でアクセスが記録されることを確認する

## 参考リンク

- [Starlight ドキュメント](https://starlight.astro.build/)
- [Astro ドキュメント](https://docs.astro.build)
- [@flowershow/remark-wiki-link](https://github.com/flowershow/remark-wiki-link)
