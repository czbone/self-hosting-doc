---
title: Coolifyのインストール
description: VPS 上に Coolify をインストールし、PaaS 環境の土台を構築する手順の概要です。
sidebar:
  order: 1
---

**[[guides/vps/index|VPS の準備]]** が完了したら、この章で Coolify をインストールします。

Coolify は自分の VPS 上で PaaS に近い体験を提供するセルフホスト型の管理ツールです。  
ブラウザからアプリのデプロイやドメイン設定ができ、Docker コンテナのライフサイクルを GUI で扱えます。

## この章で行うこと

1. **[[guides/coolify/preparation|インストール準備]]** — ファイアウォールで必要なポートを開放する
2. **[[guides/coolify/installation|インストール手順]]** — Coolify をインストールし、管理画面を設定する
3. **[[guides/coolify/update|バージョンアップ]]** — Automatic updates を有効にして Coolify 本体を最新に保つ
4. **[[guides/coolify/email|メールの設定（SMTP）]]** — パスワード再設定やチーム招待のメールを送れるようにする
5. **[[guides/coolify/concepts|基本的な管理のしくみ]]** — Project・Environment・Resource の構造と、公開サービスごとの分け方を理解する
6. **[[guides/coolify/resources|リソースの追加と削除]]** — 追加、起動と停止、ログ、ターミナル、削除を行う

自動アップデート後に管理画面が **502 Bad Gateway** になったときは、[[guides/coolify/bad-gateway|管理画面が Bad Gateway になった場合]] を参照してください。

## インストール後に得られるもの

- **Coolify 管理画面** — ブラウザからサーバー上のアプリを管理
- **Docker ベースの実行環境** — アプリケーションをコンテナとしてデプロイ
- **SSL/TLS の自動取得** — Let's Encrypt による HTTPS 化（後続のガイドで利用）

## 前提条件

- [[guides/vps/specs|必要スペック]] を満たす VPS が用意されている
- SSH で VPS に接続でき、root 権限（または `sudo`）でコマンドを実行できる
- [[guides/vps/security|セキュリティの基本設定]] が完了している

## 次のステップ

[[guides/coolify/preparation|インストール準備]] から始めましょう。
