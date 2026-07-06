---
title: Wiki リンクのテスト
description: Obsidian 形式の wiki 構文が Starlight でどう動作するか確認するためのサンプルページです。
---

このセクションでは `[[...]]` 形式の wiki リンクの動作を確認できます。
各リンクは `@flowershow/remark-wiki-link` によって HTML の `<a>` 要素に変換されます。

## 基本的な内部リンク

- フルパス: [[wiki-links/target-a]]
- 短い名前（末尾一致）: [[target-a]]
- 別ディレクトリへ: [[reference/example]]
- ガイドへ: [[guides/example]]

## 表示テキスト（エイリアス）

- [[wiki-links/target-a|ターゲット A を開く]]
- [[target-b|短い名前でターゲット B へ]]

## 見出しへのリンク

- [[wiki-links/target-a#インストール手順]]
- [[target-a#設定例|設定例の見出しへ]]
- 同一ページ内: [[#存在しないリンク]]

## ネストしたパス

- [[wiki-links/nested/child-page]]
- [[child-page|ネストページ（短い名前）]]

## 存在しないページ

存在しないページへのリンクには `new` クラスが付きます。

- [[存在しないページ]]
- [[wiki-links/未作成のページ|未作成ページへのエイリアス]]

## ページ間の相互リンク

- [[target-a]] と [[target-b]] は互いからリンクしています。
- [[nested/child-page]] からもこのページへ戻れます。

## 関連ページ

| ページ | 説明 |
| ------ | ---- |
| [[target-a]] | 見出しリンクのテスト用 |
| [[target-b]] | 短い名前解決のテスト用 |
| [[nested/child-page]] | ネストしたパスのテスト用 |
