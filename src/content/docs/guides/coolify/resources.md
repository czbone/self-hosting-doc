---
title: リソースの追加と削除
description: Coolify の Application・Database・Service に共通する、追加、起動と停止、ログ、ターミナル、削除の操作です。
sidebar:
  order: 7
---

[[guides/coolify/concepts|基本的な管理のしくみ]] で、Project・Environment・Resource の関係を確認してから、このページに進みます。

ここでは Application、Database、Service のどれにも共通する操作を扱います。種類ごとの違い（WordPress のドメイン設定や、PostgreSQL のロケールなど）は、それぞれの手順で説明します。

## 前提条件

- [[guides/coolify/installation|Coolify のインストールと初期設定]] が完了している
- Coolify 管理画面にログインできる
- 操作する Project がある（ウィザードの **My First Project** でも、公開アプリ用に作った Project でも構いません）

## 1. リソースの追加

1. 追加先の Project を開きます。画面に production と出ていても、そのまま使います。
2. **Create New Resource**（または **+ New**）をクリックします。
3. 追加する種類を選びます。
   - **Application** — 自分で用意した Web アプリケーション
   - **Databases** — PostgreSQL などのデータベース
   - **Services** — WordPress などのワンクリックサービス
4. サーバーの選択が出たときは、Coolify をインストールしたマシン（**This Machine** に相当するサーバー）を選びます。宛先（Docker ネットワーク）の選択が出たときも、表示された既定の宛先のままで構いません。

（スクリーンショット予定）

<!-- ![リソースの種類を選ぶ画面](../../../../assets/guide/resources/resource_type.png) -->

データベースを追加する具体例は、[[guides/database/postgresql|PostgreSQL を日本語ロケールで追加する]] を参照してください。

## 2. 起動・停止・再起動

リソースを開くと、状態に応じて **Start**、**Stop**、**Restart** が表示されます。

| 操作 | いつ使うか |
| :-- | :-- |
| **Deploy** | Application と Service を初めて動かすとき。イメージの取得や起動を行います |
| **Start** | Database を初めて動かすとき、または止めたリソースを再び動かすとき |
| **Stop** | 設定と永続データを残したまま、コンテナを止めます |
| **Restart** | 保存済みの設定のまま、動いているコンテナを入れ直します |

**Stop** では、Project 上のリソースと、ボリュームに入ったデータが残ります。再び動かすときは **Start** です。

（スクリーンショット予定）

<!-- ![リソース画面の Start / Stop / Restart](../../../../assets/guide/resources/lifecycle.png) -->

## 3. ログ

起動しないときや、エラーが出たときは **Logs** を開きます。コンテナの標準出力と標準エラーが表示されます。

ステータスが起動中にならないときは、まずこの画面でメッセージを確認します。

（スクリーンショット予定）

<!-- ![リソースの Logs 画面](../../../../assets/guide/resources/logs.png) -->

## 4. ターミナル

**Terminal** を開くと、動いているコンテナの中でコマンドを実行できます。コンテナが止まっているときは接続できません。先に **Start** または **Deploy** で起動します。

データベースの中身を確認するときにも使います。PostgreSQL のロケール確認は、[[guides/database/postgresql|PostgreSQL を日本語ロケールで追加する]] の手順でこの画面を使います。

（スクリーンショット予定）

<!-- ![リソースの Terminal 画面](../../../../assets/guide/resources/terminal.png) -->

## 5. 削除

リソースそのものを管理画面から消すときは、次の手順です。

1. 削除するリソースを開きます。
2. **Configuration** の **Danger Zone** を開きます。
3. **Delete** をクリックします。
4. 確認ダイアログの内容を読み、問題なければ削除を確定します。インスタンスの設定によっては、リソース名や Coolify のパスワードの入力を求められます。

:::caution
削除は Coolify 上から取り消せません。確認ダイアログでは、ボリュームの削除が最初から選ばれています。このまま確定すると、データベースに入っているデータも消えます。残したいデータがあるときは、削除の前に退避してください。
:::

（スクリーンショット予定）

<!-- ![Danger Zone の削除確認](../../../../assets/guide/resources/danger_zone.png) -->

一時的に止めるときは **Stop** を使います。設定とデータは残ります。

## 次のステップ

[[guides/wordpress/installation|WordPress のインストール]] で、WordPress 用の Project を作り、Service として最初の公開アプリを追加しましょう。
