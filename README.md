# AI News Universe

AIニュースを「星」として探索する、Next.js 15製の3Dインタラクティブ銀河アプリです。星はインパクトスコアに応じて大きくなり、ドラッグで銀河を回転、スクロールでズーム、クリックで詳細パネルを開けます。

## Stack

- Next.js 15 App Router
- TypeScript strict mode
- Tailwind CSS
- React Three Fiber / Three.js / `@react-three/drei`
- GSAP
- Framer Motion

## Pages

- `/tools` — AIツールアップデート銀河
- `/industry` — AIニュース全般の銀河
- `/use-cases` — Qiita、Zenn、Xなどの実践知を想定したAI活用法銀河

## Features

- 回転・ズームできる完全な3D空間
- 大きなニュースほど大きな星として表示
- 星、パーティクル、奥行き、ライト、オートローテーション
- ホバー時の拡大・グロー・プレビュー
- クリックでFramer Motionのニュース詳細パネルを表示
- 3つの銀河ページと日本語UI
- 型付きモックデータと拡張しやすい構造

## Getting Started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Project Structure

```text
src/
  app/              App Router pages, layout, global styles
  components/
    ui/             Reusable interface primitives and hero
    universe/       Three.js galaxy and planet/star components
    news/           News detail UI
  hooks/            Client state hooks
  lib/              Shared utilities
  types/            TypeScript domain types
  data/             Mock news and galaxy data
```

## Merge / Conflict Notes

- `node_modules/` と `.next/` はコミット対象外です。
- `package-lock.json` は依存関係の再現性のためコミットします。競合した場合は、手で不要な競合マーカーを除去したうえで `npm install` を再実行し、`npm run lint` と `npm run build` を通してください。
- 3D銀河ページは `src/data/galaxies.ts` を入口にしているため、ページ追加・データ追加時は銀河定義とニュースデータの両方を確認してください。

## Data

`src/data/news.ts` にニュース/ツール更新/活用法のモックデータを定義し、`src/data/galaxies.ts` で3つの銀河に分けています。Qiita、Zenn、Xの項目は外部API接続前提のモックです。
