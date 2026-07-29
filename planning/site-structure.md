# サイト構成 — セルフホスティングの細道

このドキュメントは、サイト「セルフホスティングの細道」の構成ベースを定義する。  
下書きは [`drafts/site_section.txt`](../drafts/site_section.txt)、設計基準は本ファイル（`planning/`）とする。

実装（サイドバー変更・コンテンツ追加）は別タスクとする。

---

## 方針

- 学習レベルとセルフホスティングの成熟度の両方が伝わる構成にする
- ゴールは「環境を作る」ことではない。「サービスを運用し、最後は自分で作れるようになる」こととする
- 技術軸は次を中心に据える: Coolify / Docker / Astro / Ansible / バックアップ / 自作サービス
- **ディレクトリはトピック単位**、**学習段階と目的別サブテーマはサイドバーで束ねる**

---

## 学習ストーリー

読者は次の流れで学べる構成とする。

> 作る → 使う → 運用する → 作り出す

環境構築だけで終わらず、運用・自動化・開発へと少しずつ歩みを進めるサイトであることを伝える。

---

## セクション構成（4段階）

ナビ上の大きな道筋。ディレクトリ名にはしない。

| セクション | テーマ | 主なトピック |
| --- | --- | --- |
| **初級 — 環境を立ち上げる** | セルフホスティングを始める | VPS、Linux、Docker、Coolify、ドメイン、HTTPS |
| **中級 — サービスを運用する** | アプリを動かす | WordPress、ブログ、データベース、メール、ファイル共有、便利なセルフホストアプリ |
| **上級 — 安全に運用する** | 安全・継続的な運用 | バックアップ、Ansible、GitHub Actions、ログ、監視、セキュリティ、アップデート |
| **達人編 — 自分で作る** | サービス・インフラ開発 | Astro、React、Node.js、Dockerfile、Docker Compose、API、デプロイ |

### 初級 — 環境を立ち上げる

セルフホスティングの土台を用意する。

- VPS
- Linux
- Docker
- Coolify
- ドメイン
- HTTPS

### 中級 — サービスを運用する

Coolify 上でアプリケーションを動かし、日常的に使うサービスを育てる。

- WordPress
- ブログ
- データベース
- メール
- ファイル共有
- 便利なセルフホストアプリ

### 上級 — 安全に運用する

止めずに、安全に、再現可能な運用へ進める。

- バックアップ
- Ansible
- GitHub Actions
- ログ
- 監視
- セキュリティ
- アップデート

### 達人編 — 自分で作る

自前のサービスを設計・実装し、本番へ載せる。

- Astro
- React
- Node.js
- Dockerfile
- Docker Compose
- API
- デプロイ

---

## 情報設計の分離

| 層 | 役割 | 例 |
| --- | --- | --- |
| ディレクトリ | 技術・題材（トピック） | `guides/vps`, `guides/coolify`, `guides/security` |
| サイドバー（段階） | 学習の大きな道筋 | 初級 / 中級 / 上級 / 達人編 |
| サイドバー（サブテーマ） | 段階内の目的別グループ | 中級の「サービスを運用する」「セキュリティを強化する」 |

同じトピックを複数の段階・サブテーマから参照してよい。  
フォルダを `beginner/` や `intermediate/` でネストしない。

---

## コンテンツディレクトリ案

トピックごとに `guides/` 直下へ置く。既存の `guides/vps` / `guides/coolify` はそのまま維持する。

```
src/content/docs/
  guides/
    vps/              # 既存
    coolify/          # 既存
    linux/
    docker/
    domain/
    https/
    wordpress/
    blog/
    database/
    mail/
    files/
    apps/
    backup/
    ansible/
    ci/               # GitHub Actions 等
    logging/
    monitoring/
    security/         # 運用全体のセキュリティ（VPS 初期設定とは別）
    updates/
    astro/
    react/
    nodejs/
    dockerfile/
    compose/
    api/
    deploy/
  reference/
```

補足:

- `guides/vps/security.md` など、トピック内の初期設定はそのトピック配下のまま
- 運用全体のセキュリティは `guides/security/` に分ける
- URL（`/guides/vps/` など）は段階に依存せず安定させる

---

## サイドバー方針

`astro.config.mjs` の `sidebar` で段階 →（必要ならサブテーマ）→ トピックの順に束ねる。

| 日本語 | English（translations） |
| --- | --- |
| 初級 — 環境を立ち上げる | Beginner — Set up the environment |
| 中級 | Intermediate |
| 上級 — 安全に運用する | Advanced — Operate safely |
| 達人編 — 自分で作る | Master — Build your own |
| リファレンス | Reference |

### 基本構成

```
■ 初級 — 環境を立ち上げる
    VPS          → guides/vps
    Linux        → guides/linux
    Docker       → guides/docker
    Coolify      → guides/coolify
    ドメイン     → guides/domain
    HTTPS        → guides/https

■ 中級
    ■ サービスを運用する
        WordPress / ブログ / データベース / …
    ■ セキュリティを強化する   ← 段階内のサブテーマ例
        セキュリティ / HTTPS / アップデート など

■ 上級 — 安全に運用する
    バックアップ / Ansible / …

■ 達人編 — 自分で作る
    Astro / React / …

■ リファレンス
```

### サブテーマの扱い

- 「サービスを運用する」以外に「セキュリティを強化する」など目的が増えた場合も、**ディレクトリは増やさずサイドバーに小見出しを足す**
- その柱がサイト全体の大きな道筋になる場合のみ、4段階と同列のセクション追加を検討する
- 読む順番を強く示したい場合は、ハブページ（目次・次に読む順）を別途置いてよい

### autogenerate とページ個別指定

- トピック全体を1か所に出す → `autogenerate: { directory: 'guides/vps' }` でよい（現状どおり）
- 同一トピックのページを中級と上級など **複数グループに振り分ける** → サイドバーでページを個別指定する  
  （例: `guides/security/basics.md` を中級、`hardening.md` を上級）

---

## 現状との差分

現状のサイドバー（`astro.config.mjs`）は次のとおり。

- Coolifyのインストール（`guides/vps`、`guides/coolify`）
- リファレンス

トップページの Coming soon（ブログ / バックアップ / 開発とデプロイ）は、それぞれ中級・上級・達人編に対応する。

| 段階 | 状態 |
| --- | --- |
| 初級（VPS・Coolify） | 一部実装済み（パスは現状のトピック直下のまま） |
| 初級（Linux / Docker / ドメイン / HTTPS） | 未整備 |
| 中級 | 未整備 |
| 上級 | 未整備 |
| 達人編 | 未整備 |

既存ガイドのパス移行は不要（トピック直下を維持するため）。

---

## 今後の進め方（高レベル）

1. 本ドキュメントをサイト構成の基準として維持する
2. サイドバーを「段階 →（サブテーマ）→ トピック」に合わせる
3. 既存の VPS / Coolify はパスを変えず、初級グループから参照する
4. 不足トピックを `guides/<topic>/` として追加し、ナビに載せる

### スコープ外（本ドキュメントでは扱わない）

- 各ページの本文執筆
- `astro.config.mjs` / content の実変更
