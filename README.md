# admin-design-system

管理サイト共通 UI ライブラリ。  
React + Vite + Tailwind CSS v4 + Firebase 構成のプロジェクトで使用する。

## 使い方

1. `src/design-system/` を対象プロジェクトの `src/` 直下にコピー
2. `src/index.css` を以下に変更:

```css
@import "tailwindcss";
@import "./design-system/tokens.css";
```

3. コンポーネントを import して使う:

```jsx
import { Button, Card, PageHeader, FormField, Input } from './design-system';
```

## 新規ページ作成

`src/design-system/template/AdminPage.template.jsx` をコピーして使う。

## デザインシステム仕様

→ [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)

## ブランチ運用

| ブランチ | 用途 |
|---|---|
| `main` | 安定版。各プロジェクトはここから取得 |
| `feature/*` | 新コンポーネント追加・改修作業用 |
