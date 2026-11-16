# エックスサーバーへの公開（GitHub から自動で取り込む）

公開 URL: https://yoursong.wedding.omoshiroproject.jp/
サーバー: エックスサーバー omopro88（ビジネスプラン）／ドメイン omoshiroproject.jp

## しくみ

- サイトの正本はこのリポジトリの `publish` ブランチの `site/`。
- エックスサーバーの cron（定期実行）が 10 分ごとに `publish` ブランチを取り込み、`site/` の中身をサブドメインの公開フォルダへ写す。
- リポジトリは公開なので、GitHub 側にもサーバー側にも鍵は要らない。FTP も使わない。
- 直したいときは `publish` ブランチの `site/` を直して push するだけ（最大 10 分で反映）。

## 一度だけの設定（サーバーパネル）

1. 「サブドメイン設定」→ ドメイン `omoshiroproject.jp` → サブドメイン名 `yoursong.wedding`
   - 無料独自SSL：利用する
   - 公開フォルダ：既定（`/home/omopro88/omoshiroproject.jp/public_html/yoursong.wedding/` の見込み。違う場合は下の `D=` を合わせる）
2. 「Cron設定」→ 追加：
   - 分 `*/10`、時 `*`、日 `*`、月 `*`、曜日 `*`
   - コマンド（1 行）:

```
/bin/bash -c 'R=/home/omopro88/.yoursong-src; D=/home/omopro88/omoshiroproject.jp/public_html/yoursong.wedding; [ -d "$D" ] || exit 1; [ -d "$R/.git" ] || git clone -q --depth 1 -b publish https://github.com/omoshiroproject-sketch/yoursong.git "$R"; git -C "$R" fetch -q --depth 1 origin publish && git -C "$R" reset -q --hard FETCH_HEAD && rsync -a --exclude ".git" "$R/site/" "$D/"'
```

   - 公開フォルダが無いときは何もしない（`[ -d "$D" ] || exit 1`）。消す操作はしない（rsync に --delete を付けていない）。

## 確かめ方

- https://yoursong.wedding.omoshiroproject.jp/ が開く（証明書が有効）。
- 公式 LINE ボタン 6 か所のリンク先が `https://lin.ee/QiPtkmg`。
- `/legal/privacy` `/legal/terms` `/legal/tokusho` `/legal/ai-transfer` が開く。
- `/robots.txt` `/sitemap.xml` `/og-image.jpg` が 200。

## 計測タグ

`site/assets/ys-tracking.js` の `IDS` に GA4・Google 広告・Meta ピクセルの ID を入れると動く（空なら何も読み込まない）。
入れる前に、プライバシーポリシー「8. Cookie等」へ利用目的・事業者名・オプトアウト方法を追記する（ポリシー本文にそう書いてある）。
LINE ボタンのクリックは `generate_lead`（Meta では `Lead`）、サンプル曲の初回再生は `sample_play` として送る。
