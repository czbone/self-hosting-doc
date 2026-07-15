# self-hosting-doc

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

[Astro](https://docs.astro.build) と [Starlight](https://starlight.astro.build/) で構築した日本語ドキュメントサイトのソースリポジトリです。Obsidian 形式の wiki リンク（`[[...]]`）に対応しています。

## 技術スタック

| 項目 | 採用技術 |
| :-- | :-- |
| フレームワーク | Astro 7 |
| ドキュメント基盤 | `@astrojs/starlight` |
| テーマ | `starlight-theme-galaxy` |
| 画像ズーム | `starlight-image-zoom` |
| Wiki リンク | `@flowershow/remark-wiki-link` |
| パッケージマネージャー | pnpm |
| ホスティング | GitHub Pages（カスタムドメイン: `magic3.org`） |

## プロジェクト構成

```
.
├── .github/workflows/
│   └── deploy.yml           # GitHub Pages への CI/CD
├── public/                  # 静的ファイル（favicon、CNAME など）
├── src/
│   ├── assets/              # 画像アセット（Markdown から相対パスで参照）
│   ├── components/          # カスタム Astro コンポーネント
│   ├── content/
│   │   ├── docs/            # ドキュメント本体（.md / .mdx）
│   │   └── i18n/            # Starlight UI 文言の翻訳
│   ├── remark/
│   │   └── remark-wiki-link-starlight.mjs  # wiki リンクの Starlight 向けアダプター
│   ├── styles/              # カスタム CSS
│   └── content.config.ts    # Content Collections の定義
├── astro.config.mjs         # Astro / Starlight の設定
├── package.json
└── pnpm-workspace.yaml
```

## コンテンツの仕組み

### ファイルと URL の対応

`src/content/docs/` 以下の `.md` / `.mdx` ファイルが、そのパスに対応する URL として公開されます。拡張子を除いたパスがそのまま URL になります。

| ファイル | URL |
| :-- | :-- |
| `src/content/docs/guides/foo.md` | `/guides/foo/` |
| `src/content/docs/index.mdx` | `/` |

### Content Collections

[`src/content.config.ts`](src/content.config.ts) で Starlight の `docs` と `i18n` コレクションを定義しています。ドキュメントの frontmatter は Starlight の `docsSchema` に従います。

### サイドバー

サイドバーの構成は [`astro.config.mjs`](astro.config.mjs) の `sidebar` で定義します。`autogenerate` を使うと、指定ディレクトリ内のファイルから自動的にナビゲーションを生成できます。

### 画像

`src/assets/` に置いた画像は、ドキュメントから相対パスで参照します。トップページの hero 画像のように、frontmatter からも指定できます。

```yaml
hero:
  image:
    file: ../../assets/example.png
```

### カスタムコンポーネント

`.mdx` ファイルでは Astro コンポーネントを import して利用できます。例: [`src/components/IconLinkCard.astro`](src/components/IconLinkCard.astro)（アイコン付きリンクカード）。

### スタイル

[`astro.config.mjs`](astro.config.mjs) の `customCss` で、以下の CSS を Starlight に読み込ませています。

- `src/styles/fonts.css` — フォント（Noto Sans JP、M PLUS 1 Code）
- `src/styles/hero.css` — トップページの hero セクション
- `src/styles/cards.css` — カードコンポーネント
- `src/styles/content.css` — 本文スタイル
- `src/styles/header.css` — ヘッダー

### 国際化

ロケールは `ja`（ルート）のみです。UI 文言のカスタマイズは `src/content/i18n/ja.json` で行います。

## Wiki リンク

Markdown 内で Obsidian 形式のリンクが使えます。

```markdown
[[guides/foo]]
[[reference/bar|表示テキスト]]
[[guides/baz#見出し名]]
```

### 処理の流れ

1. `@flowershow/remark-wiki-link` が `[[...]]` 構文をパースする
2. [`src/remark/remark-wiki-link-starlight.mjs`](src/remark/remark-wiki-link-starlight.mjs) が `src/content/docs/` 内のファイル一覧を収集し、Starlight の URL 形式（末尾スラッシュ付き）へ変換する
3. [`astro.config.mjs`](astro.config.mjs) の `markdown.processor` で remark プラグインとして登録する

## 開発

### 前提

- Node.js 24 推奨（CI と同じバージョン）
- pnpm 11

### コマンド

プロジェクトルートで実行します。

| コマンド | 説明 |
| :-- | :-- |
| `pnpm install` | 依存関係をインストール |
| `pnpm dev` | 開発サーバーを起動（`http://localhost:4321`） |
| `pnpm build` | 本番ビルド（出力: `./dist/`） |
| `pnpm preview` | ビルド結果をローカルでプレビュー |
| `pnpm astro ...` | Astro CLI（`astro add` など） |

エージェントやバックグラウンド実行では、Astro のバックグラウンドモードも使えます。

```bash
astro dev --background   # 起動
astro dev status         # 状態確認
astro dev logs           # ログ表示
astro dev stop           # 停止
```

## デプロイ

`main` ブランチへの push で [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) が実行され、GitHub Pages にデプロイされます。

### パイプラインの概要

1. `pnpm install --frozen-lockfile` で依存関係をインストール
2. Astro のビルドキャッシュ（`node_modules/.astro`）を復元・保存
3. `pnpm build` で静的サイトを生成（`dist/`）
4. `actions/deploy-pages` で GitHub Pages に公開

### サイト URL

[`astro.config.mjs`](astro.config.mjs) の `site` に本番 URL を設定しています。カスタムドメインは [`public/CNAME`](public/CNAME) で指定します。

## Google Analytics（GA4）

[Google Analytics 4](https://analytics.google.com/)（gtag.js）を利用しています。Starlight の `head` 設定（[`astro.config.mjs`](astro.config.mjs)）により、全ページの `<head>` にタグを注入します。

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
