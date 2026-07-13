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
