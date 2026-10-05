---
title: 管理画面が Bad Gateway になった場合
description: 自動アップデート後に Coolify 管理画面が 502 Bad Gateway になったときの確認と復旧手順です。
sidebar:
  order: 8
---

[[guides/coolify/update|Automatic updates]] を有効にしていると、Coolify 本体の更新直後に管理画面が **502 Bad Gateway** になることがあります。管理画面が使えないため、VPS に SSH 接続して確認します。

バージョンアップ中は、管理画面が短時間使えなくなることがあります。数分待っても戻らない場合は、このページの手順でコンテナの状態を確認してください。

## 原因の見立て

アクセスの流れは次のとおりです。

```text
ブラウザ
   ↓
Traefik（coolify-proxy）
   ↓
Coolify コンテナ
```

よくあるのは、`coolify-proxy` は動いているのに、接続先の **`coolify` 本体が起動していない** パターンです。コンテナの状態が `Created` や `Exited` になっていると、Traefik から接続できず 502 になります。

`coolify-proxy` や `coolify-realtime` が `Up` でも、本体が止まっていれば管理画面は開きません。**まず `coolify` コンテナを確認してください。**

## 1. コンテナの状態を確認する

```bash
docker ps -a --filter name=coolify
```

正常時は、少なくとも次のコンテナが `Up` になっています。

- `coolify`
- `coolify-db`
- `coolify-redis`
- `coolify-realtime`
- `coolify-proxy`

特に **`coolify` が `Created` や `Exited` になっていないか** を確認します。典型的な異常は次のような状態です。

```text
coolify             Created   ← 問題
coolify-db          Up (healthy)
coolify-redis       Up (healthy)
coolify-realtime    Up (healthy)
coolify-proxy       Up (healthy)
```

## 2. `coolify` が起動していない場合

`coolify` が `Created` や `Exited` のときは、次を実行します。

```bash
docker start coolify
```

その後、もう一度状態を確認します。

```bash
docker ps -a --filter name=coolify
```

`coolify` が `Up` になり、管理画面にアクセスできれば、追加の操作は不要です。

起動後のログで、PHP-FPM / NGINX が動き、DB migration が終わっていることも確認できます。

```bash
docker logs --tail 200 coolify
```

## 3. `coolify` が起動しない場合

ログを確認します。

```bash
docker logs --tail 200 coolify
```

必要に応じてリアルタイムで追います。

```bash
docker logs -f coolify
```

DB・Redis・Realtime も確認します。

```bash
docker logs --tail 100 coolify-db
docker logs --tail 100 coolify-redis
docker logs --tail 100 coolify-realtime
```

自動アップデートの直後なら、アップデート処理が完了していない可能性があります。次でログを確認します。

```bash
cd /data/coolify/source
ls -lt upgrade-*.log | head
```

最新のログを開き、エラーを探します。ファイル名の日時は実際のログに合わせてください。

```bash
less upgrade-YYYY-MM-DD-HH-MM-SS.log
```

```bash
grep -n -i -E "error|failed|abort|compose|coolify" \
  upgrade-YYYY-MM-DD-HH-MM-SS.log
```

`coolify-realtime` が `Up` かつ `healthy` なら、管理画面の 502 の主因ではないことが多いです。**`docker-compose.yml` は不用意に編集しないでください。**

## やってはいけないこと

:::caution
Bad Gateway が出た直後に、次をいきなり実行しないでください。

```bash
docker compose down
```

```bash
docker compose up -d
```

```bash
curl ... | bash
```

まずコンテナの状態とログを確認します。**DB や `/data/coolify` のデータを削除する操作は行わないでください。**
:::

## 復旧後の確認

主要コンテナが動いていることを確認します。

```bash
docker ps -a --filter name=coolify
```

次のようになっていれば問題ありません。

```text
coolify             Up
coolify-db          Up (healthy)
coolify-redis       Up (healthy)
coolify-realtime    Up (healthy)
coolify-proxy       Up (healthy)
```

その後、ブラウザから Coolify 管理画面にアクセスします。

## 再発防止

Automatic updates を使う場合は、[[guides/coolify/update|Update frequency]] の時刻のあと、コンテナの状態と管理画面を一度確認すると安心です。

手動で更新するときは、次の順で進めてください。

1. Coolify のバックアップを取得する
2. アップデートする
3. `docker ps -a` でコンテナの状態を確認する
4. `docker logs` で Coolify 本体を確認する
5. 管理画面へアクセスして動作確認する

問題が起きたときは、まず次の 2 つを確認します。

```bash
docker ps -a --filter name=coolify
docker logs --tail 200 coolify
```

**`coolify` が `Created` / `Exited` なら、まず `docker start coolify` を試してください。**

本番で管理画面を止められない場合は、自動更新ではなく手動（または半自動）での運用も検討できます。Automatic updates 自体は、このガイドでは有効にしておく運用を前提にしています。
