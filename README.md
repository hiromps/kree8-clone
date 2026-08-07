# Social Smart — コーポレートサイト

「**AIで、社会をスマートに**」— 自動化で、人とサービスをつなぐ [Social Smart](mailto:socialsmart.jp@gmail.com) の公式サイト。

Kree8 Studio のデザイン雛形(`index.html`、リポジトリ直下に参照用として保存)を **Next.js 16 (App Router / TypeScript)** に移植したもの。デザイン・レイアウト・アニメーションは雛形を完全維持し、文言とアセットのみ Social Smart 用に置き換えている。

## 開発

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # 本番ビルド
npm start      # 本番サーバー
```

## ページ構成

- **/** — ヒーロー、Mission、Services(ポラロイド)、Why Social Smart(タイプスペシメン)、プロダクトスライドショー、サービス領域、ご依頼の流れ、Vision、締め+フッター
- **/products** — 全5プロダクトのスクリーンショット一覧(SMARTGRAM / anima.js / Minoru-AI / SocialGoodWorld / SMM Smart)
- **/pricing** — HP制作パッケージ(一括)+ 月額サポートプラン
- **/playground** — パン&ズームできるスクリーンショットボード(サイドバーはアイコンレールに収縮、ホバーで展開)

## スタック

- Next.js 16.3 / React 19 / TypeScript
- Tailwind CSS 3.4(雛形の Play CDN と同じ v3 系をコンパイルして使用)
- GSAP 3.12.5 + ScrollTrigger(スクロールリビール)
- RemixIcon 4.2 / next/font(Inter・Noto Sans JP・Caveat・Phudu)

## メモ

- ヒーロー動画は poster 先行。`public/videos/hero.mp4` を置くだけで自動再生が有効になる(コード変更不要)。
- 画像はすべて自前アセット(実プロダクトのスクリーンショット+自作SVG)。
- `index.html` は移植元の参照用で、サイトからは配信されない。
