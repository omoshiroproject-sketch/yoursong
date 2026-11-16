# Your Song（結婚式のオリジナルソング）LP

- `site/` … 公開しているサイト一式（静的ファイル）。元は ChatGPT のサイト機能で作った https://your-song-wedding.omoshiroproject.chatgpt.site/ （2026-11-16 に写した）。
- `docs/IMPORT_REPORT.md` … 写したときの記録（ファイル一覧・外部ホスト・注意点）。
- `deploy/README.md` … エックスサーバーへの公開のしくみ（cron で GitHub から取り込む）。

## 写したあとに足したもの（publish ブランチ）

- 各ページに OGP（og:*）・Twitter Card・canonical・favicon の指定、`og-image.jpg`（1200×630）
- 計測の差し込み口 `assets/ys-tracking.js`（ID を入れるまで何もしない）
- `robots.txt` `sitemap.xml` `.htaccess`（https への統一・.rsc の MIME・キャッシュ）
- 配信時に Cloudflare が差し込んでいたスクリプトを削除
- 使われていないフォントの先読み 490 件を削除（1 回の表示で約 16 MB の無駄な読み込みになっていた。見た目は元サイトと同じ端末標準フォント）

正本はこのリポジトリ。ChatGPT 側のサイトを直しても、ここには反映されない。
