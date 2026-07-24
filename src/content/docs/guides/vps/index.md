---
title: VPSの準備
description: Coolify を動かすための VPS 契約・選定・セキュリティ設定の概要です。
sidebar:
  order: 1
---

Coolify をインストールする前に、VPS（Virtual Private Server）の準備を行います。  
この章では、必要なスペックの確認、プロバイダの選定、基本的なセキュリティ設定までを順を追って説明します。

## この章で行うこと

1. **[[guides/vps/specs|必要スペックの確認]]** — Coolify が安定して動く最低条件を満たす
2. **[[guides/vps/selection|VPS プロバイダの選定]]** — 契約先を決め、サーバーを用意する
3. **[[guides/vps/security|セキュリティの基本設定]]** — ファイアウォールで必要なポートのみ開放する

## Coolify インストールへの前提

この章の作業が完了すると、次の章 **[[guides/coolify/index|Coolify のインストール]]** に進めます。

VPS 上で SSH 接続ができ、root 権限（または `sudo`）でコマンドを実行できる状態になっていることを確認してください。

## ページ一覧

| ページ | 内容 |
| :-- | :-- |
| [必要スペック](/guides/vps/specs/) | CPU・メモリ・ストレージ・OS の要件 |
| [VPS の選択](/guides/vps/selection/) | 品質の見方とプロバイダ実例 |
| [セキュリティ](/guides/vps/security/) | ファイアウォールの基本 |

## 次のステップ

[[guides/vps/specs|必要スペックの確認]] から始めましょう。
