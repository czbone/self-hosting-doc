---
title: ターゲット B
description: 短い名前での wiki リンク解決をテストするページです。
---

`[[target-b]]` のようにファイル名だけを指定しても、このページへ解決されます。

## 他ページへのリンク

- [[target-a|ターゲット A]]
- [[wiki-links/index|テスト一覧]]
- [[guides/example|サンプルガイド]]

## 短い名前解決について

`format: "shortestPossible"` により、wiki リンクのターゲットは `src/content/docs` 内のファイルパスの末尾と照合されます。
同名のファイルが複数ある場合は、より短いパスが優先されます。
