---
title: 基本的な管理のしくみ
description: Coolify の Project・Environment・Resource の構造と、このガイドでの分け方です。
sidebar:
  order: 6
---

Coolify では、Web アプリケーションやデータベースなどを、いくつかの単位に分けて整理します。

基本的な構造は、次のとおりです。

```text
Project
  └── Environment
        ├── Application
        ├── Database
        └── Service
```

## Project（プロジェクト）

**Project** は、関連するアプリケーションなどをまとめる単位です。

例えば「ブログ」という Project を作り、ブログを動かすために必要なものをその中にまとめられます。Project はサーバーの物理構成そのものとは別の、管理画面上の論理的な入れ物です。

## Environment（環境）

Project の中には **Environment** があります。本番（production）とテスト（preview）を分けるときに使います。

```text
ブログ Project
├── production（本番）
└── preview（テスト）
```

本番で動いているものと、テスト用のものを分けて管理できます。

このガイドでは環境は増やさず、最初からある **production** をそのまま使います。画面に production と出ていても、そのままで構いません。

## Resource（リソース）

Environment の中で実際に動かすものが **Resource** です。Application、Database、Service をまとめた呼び方です。

例えば、ブログは次のように置けます。

```text
ブログ Project
└── production
      ├── Service
      │     └── WordPress
      └── Database
            └── MariaDB
```

この図は、Coolify 上で並ぶ単位の例です。後続の WordPress 手順で使うワンクリックサービスは MariaDB を内包しているため、Database を別に作る必要はありません。

### Application（アプリケーション）

**Application** は、実際に動かす Web アプリケーションです。

- Astro
- Next.js
- Node.js アプリケーション

### Database（データベース）

**Database** は、アプリケーションが利用するデータベースです。

- PostgreSQL
- MySQL
- MariaDB
- Redis

公開ドメインを持たないデータベースは、それを使うアプリと同じ Project に入れます。

### Service（サービス）

**Service** は、複数のコンテナから構成されるまとまったサービスです。Coolify には、WordPress などのオープンソースソフトウェアを簡単に構築できる、あらかじめ用意されたサービスもあります。

このガイドの WordPress は、Application ではなく Service として追加します。

## まとめ

Coolify の管理構造は、次のように考えると分かりやすいです。

```text
Project
  │
  │  「何のためのものか」
  ↓
Environment
  │
  │  「本番か、テストか」
  ↓
Application / Database / Service
     「実際に動かすもの」
```

**Project で大きくまとめ、Environment で環境を分け、その中で Application や Database、Service を管理する** という構造です。

## このガイドの推奨

VPS 上には複数のアプリ（ブログ、写真バックアップ、ファイル共有など）を載せられます。それぞれにサブドメインを割り当てて運用するのが一般的です。

**公開するサービスごとに Project を分け、各サービスには主ドメイン（サブドメイン）を 1 つ割り当てます。**

| 公開サービス | プロジェクト例 | 主ドメインの例 |
| :-- | :-- | :-- |
| ブログ（WordPress） | WordPress | `blog.example.com` |
| 写真バックアップ（Immich） | Immich | `photos.example.com` |
| ファイル共有（Nextcloud） | Nextcloud | `files.example.com` |

- ドメインは Project ではなく、各 Resource に設定します
- Coolify 管理画面用のドメイン（例: `coolify.example.com`）は、アプリ用 Project とは別です

初期セットアップで作られる **My First Project** はウィザード用の最初の箱です。このガイドでは、公開アプリ用には **専用の Project を新規作成** します（My First Project はそのまま残しても、使わなくても構いません）。

## このガイドでの進め方

1. インストールウィザードで **My First Project** が作成される（[[guides/coolify/installation|インストール手順]]）
2. 公開するサービスごとに **専用の Project を新規作成** する
3. その Project の production に Resource を追加し、主ドメインを 1 つ割り当てる

## 次のステップ

[[guides/wordpress/installation|WordPress のインストール]] で、WordPress 用の Project を作り、Service として最初の公開アプリを追加しましょう。
