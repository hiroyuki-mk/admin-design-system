# Admin Design System

React + Vite + Tailwind CSS v4 + Firebase 構成の管理サイト用デザインシステム。
このドキュメントを Claude に添付することで、毎回デザイン指示をしなくても一貫した UI が作れる。

**バージョン**: v1.0  
**最終更新**: 2026-03-26

---

## ディレクトリ構成

```
src/
├── index.css                          ← @import "tailwindcss" + tokens.css
└── design-system/
    ├── tokens.css                     ← @theme カスタムトークン定義
    ├── index.js                       ← 全コンポーネントをまとめて export
    ├── components/
    │   ├── Button.jsx
    │   ├── Input.jsx                  ← Input / Textarea / Checkbox
    │   ├── Card.jsx                   ← Card / SectionTitle / Divider
    │   ├── PageHeader.jsx
    │   ├── FormField.jsx              ← FormField / BadgeLabel
    │   ├── Table.jsx                  ← DataTable / Pagination
    │   ├── Modal.jsx
    │   └── Badge.jsx
    └── template/
        └── AdminPage.template.jsx     ← 新規ページ作成時のひな形
```

**src/index.css の記述順（必須）:**
```css
@import "tailwindcss";
@import "./design-system/tokens.css";
```

---

## フォント

Tailwind v4 のデフォルトと同一スタックを使用。

```
ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"
```

| OS | 実際に使われるフォント |
|---|---|
| Windows | 游ゴシック |
| macOS | Hiragino Sans |

---

## カラーパレット

| トークン | 値 | 用途 |
|---|---|---|
| `--color-primary` | `#3B82F6` | メインボタン・フォーカス・リンク |
| `--color-primary-hover` | `#2563EB` | Primary ホバー |
| `--color-primary-light` | `#EFF6FF` | アクティブナビ背景・バッジ背景 |
| `--color-success` | `#10B981` | 成功・マスタ自動入力バッジ |
| `--color-success-light` | `#D1FAE5` | success バッジ背景 |
| `--color-danger` | `#EF4444` | 削除ボタン・エラー・配券バッジ |
| `--color-danger-hover` | `#DC2626` | Danger ホバー |
| `--color-danger-light` | `#FEF2F2` | エラー input 背景・danger バッジ背景 |
| `--color-gray-50` / `--color-bg` | `#F9FAFB` | ページ背景 |
| `--color-gray-100` | `#F3F4F6` | 読取専用 input 背景・テーブルヘッダ |
| `--color-gray-200` | `#E5E7EB` | カード・テーブル行ボーダー |
| `--color-gray-300` | `#D1D5DB` | input ボーダー・セカンダリボタン |
| `--color-gray-500` | `#6B7280` | プレースホルダー・サブテキスト |
| `--color-gray-700` | `#374151` | ラベル・セカンダリボタンテキスト |
| `--color-gray-900` | `#111827` | ページタイトル・本文 |

---

## タイポグラフィ

| 用途 | サイズ | ウェイト | Tailwind クラス例 |
|---|---|---|---|
| ページタイトル (h1) | 28px | 700 | `text-[28px] font-bold text-gray-900` |
| セクションタイトル | 18px | 600 | `text-lg font-semibold text-gray-900` |
| ラベル | 14px | 600 | `text-sm font-semibold text-gray-700` |
| 本文 | 14px | 400 | `text-sm text-gray-800` |
| ヒント・補足 | 12px | 400 | `text-xs text-gray-500` |

---

## レイアウトルール

| 定数 | 値 | 適用画面 |
|---|---|---|
| `--max-width-list` | 1200px | 一覧画面 |
| `--max-width-form` | 1400px | 登録・編集・詳細画面 |
| ページパディング | `py-8 px-6`（32px 24px） | 全ページ共通 |
| カードパディング | `p-8`（32px） | 通常カード |
| カード間ギャップ | `gap-6`（24px） | 2カラムグリッド |

### 2カラムレイアウト（登録・編集・詳細画面）

```jsx
<div className="grid grid-cols-2 gap-6 items-start">
  <Card>...</Card>                        {/* 左カラム: メイン情報 */}
  <div className="flex flex-col gap-6">  {/* 右カラム: 複数カード */}
    <Card>...</Card>
    <Card>...</Card>
  </div>
</div>
```

---

## App Header

| 項目 | 値 |
|---|---|
| 高さ | 72.5px |
| パディング | 16px 24px |
| 背景 | #FFFFFF |
| 下ボーダー | 1px solid #E5E7EB |
| position | sticky / top: 0 / z-index: 100 |

---

## ボーダー / 角丸 / シャドウ

| トークン | 値 | 対象 |
|---|---|---|
| `--radius-card` | 12px | カード・モーダル |
| `--radius-input` | 8px | input・button・ページネーション |
| `--radius-badge` | 6px | バッジ・ドロップダウン |
| `--shadow-card` | `0 1px 3px rgba(0,0,0,0.1)` | カード |
| `--shadow-modal` | `0 20px 60px rgba(0,0,0,0.2)` | モーダル |
| `--shadow-dropdown` | `0 4px 16px rgba(0,0,0,0.12)` | ドロップダウン |

---

## コンポーネント仕様

### Button

```jsx
import { Button } from '../design-system';

// variant: 'primary'(default) | 'secondary' | 'danger'
// size: 'md'(default) | 'lg'
// ※ md・lg ともに高さは同一（上下 padding: 10px）。lg は横幅のみ広い。

<Button onClick={handleSubmit}>登録する</Button>
<Button variant="secondary" onClick={() => navigate(-1)}>戻る</Button>
<Button variant="danger" onClick={() => setShowDelete(true)}>削除する</Button>
<Button size="lg" className="w-full">保存する</Button>
<Button disabled>処理中...</Button>
```

**ページヘッダーのボタン配置ルール（左→右の順）:**

| 画面 | ボタン |
|---|---|
| 登録 | `登録する`(primary) · `戻る`(secondary) |
| 編集 | `更新する`(primary) · `戻る`(secondary) · `削除する`(danger) |
| 詳細 | `編集する`(primary) · `戻る`(secondary) |
| 一覧 | なし（テーブル上部に「追加」ボタン） |

---

### Input / Textarea / Checkbox

```jsx
import { Input, Textarea, Checkbox } from '../design-system';

<Input name="title" value={v} onChange={handleChange} />
<Input name="url"   value={v} onChange={handleChange} error={urlError} />
<Input name="code"  value={v} onChange={handleChange} readOnly width="w-28" />
<Textarea name="memo" value={v} onChange={handleChange} rows={6} />
<Checkbox
  name="isActive"
  checked={formData.isActive}
  onChange={(e) => setFormData(p => ({ ...p, isActive: e.target.checked }))}
  label="有効"
/>
```

---

### Card / SectionTitle / Divider

```jsx
import { Card, SectionTitle, Divider } from '../design-system';

<Card>
  <SectionTitle>依頼情報</SectionTitle>
  ...fields
  <Divider />
  ...more fields
</Card>

{/* テーブルラップ（padding なし） */}
<Card padding="none">
  <table>...</table>
</Card>
```

---

### PageHeader

```jsx
import { PageHeader } from '../design-system';

<PageHeader
  title="作業設計 - 登録"
  subtitle="依頼メールから情報を登録してください"
  actions={[
    <Button key="submit" onClick={handleSubmit}>登録する</Button>,
    <Button key="back" variant="secondary" onClick={() => navigate(-1)}>戻る</Button>,
  ]}
/>
```

---

### FormField / BadgeLabel

```jsx
import { FormField, BadgeLabel } from '../design-system';

{/* 基本 */}
<FormField label="タイトル">
  <Input name="title" value={v} onChange={handleChange} />
</FormField>

{/* ヒント付き */}
<FormField label="一般発売日" hint="［９］一般発売 >《一般発売日》">
  <div className="flex gap-3">
    <Input name="date" value={v} onChange={handleChange} width="w-60" />
    <Input name="time" value={v} onChange={handleChange} width="w-28" />
  </div>
</FormField>

{/* 必須バッジ */}
<FormField label="取引先コード" required>
  <Input name="clientCode" value={v} onChange={handleChange} />
</FormField>

{/* カード最終フィールド（下マージンなし） */}
<FormField label="作業メモ" last>
  <Textarea name="memo" value={v} onChange={handleChange} />
</FormField>

{/* ラベル内インラインバッジ */}
<FormField
  label={<>取引先コード <BadgeLabel color="success">✓ マスタから自動入力</BadgeLabel></>}
>
  <Input name="clientCode" value={v} onChange={handleChange} readOnly />
</FormField>
```

`BadgeLabel` の color: `'success'` | `'primary'` | `'danger'` | `'gray'`

---

### DataTable / Pagination

```jsx
import { DataTable, Pagination } from '../design-system';

const columns = [
  { key: 'name',     label: '名称' },
  { key: 'worker',   label: '作業者', width: 'w-32' },
  { key: 'date',     label: '登録日時', width: 'w-40' },
  { key: '_actions', label: '', width: 'w-24', align: 'right' },
];

<DataTable
  columns={columns}
  rows={pagedItems}
  renderCell={(row, key) => {
    if (key === '_actions') return (
      <Button variant="secondary" onClick={() => navigate(`/edit/${row.id}`)}>編集</Button>
    );
    return row[key] ?? '-';
  }}
/>

<Pagination
  total={filteredItems.length}
  pageSize={PAGE_SIZE}
  currentPage={currentPage}
  onPageChange={setCurrentPage}
/>
```

---

### Modal

```jsx
import { Modal } from '../design-system';

{/* 削除確認 */}
<Modal
  open={showDeleteDialog}
  onClose={() => setShowDeleteDialog(false)}
  title="削除の確認"
  footer={
    <>
      <Button variant="secondary" onClick={() => setShowDeleteDialog(false)}>キャンセル</Button>
      <Button variant="danger"    onClick={handleDelete}>削除する</Button>
    </>
  }
>
  <p className="text-sm text-gray-600 leading-relaxed">
    このデータを削除しますか？この操作は取り消せません。
  </p>
</Modal>
```

width: `'sm'` | `'md'`(default) | `'lg'`

---

### Badge

```jsx
import { Badge } from '../design-system';

// color: 'primary' | 'success' | 'danger' | 'warning' | 'gray'
{work.hasTicketDistribution && <Badge color="danger">配券あり</Badge>}
{work.hasLateTicket         && <Badge color="danger">後発券</Badge>}
<Badge color="primary">{clientCode}</Badge>
```

---

## 新しいページを作るときの手順

1. `src/design-system/template/AdminPage.template.jsx` をコピー
2. `COLLECTION` 定数を変更（例: `'products'`）
3. `// TODO` コメントを順番に書き換える
4. `App.jsx` に Route を追加

**Claude に依頼するときのプロンプト例:**
```
このデザインシステム（DESIGN_SYSTEM.md）を使って、
「商品マスタ」の一覧・登録・編集ページを作ってください。

Firestoreコレクション: products
フィールド:
  - name: string（商品名）
  - price: number（価格）
  - category: string（カテゴリ）
  - isPublished: boolean（公開フラグ）
  - memo: string（メモ）

一覧の検索は name と category で行う。
```

---

## デザインシステム改修のフロー

```
① 新プロジェクトで新コンポーネントが必要になる
         ↓
② Claude に DESIGN_SYSTEM.md を添付して依頼
   例:「Tabs コンポーネントを追加してください」
         ↓
③ Claude がコンポーネントファイル + 更新済み DESIGN_SYSTEM.md を出力
         ↓
④ design-system リポジトリの feature ブランチに追加・確認
         ↓
⑤ main にマージ
         ↓
⑥ 他プロジェクトへは必要に応じて手動コピー
```

**このドキュメントが常に最新であることが唯一のルール。**

---

## よくある実装パターン

### 読取専用 Input（マスタ自動入力）

```jsx
<FormField
  label={<>取引先コード <BadgeLabel color="success">✓ マスタから自動入力</BadgeLabel></>}
>
  <Input name="clientCode" value={formData.clientCode} onChange={handleChange} readOnly={clientLocked} width="w-28" />
</FormField>
```

### URL バリデーションエラー

```jsx
<FormField label="専用URL">
  <Input
    name="dedicatedUrl"
    value={formData.dedicatedUrl}
    onChange={handleChange}
    error={urlError}
    placeholder="https://example.com/"
  />
</FormField>
```

### ページネーション付き一覧の状態管理

```jsx
const PAGE_SIZE = 40;
const [items, setItems]             = useState([]);
const [searchTerm, setSearchTerm]   = useState('');
const [currentPage, setCurrentPage] = useState(1);

useEffect(() => { setCurrentPage(1); }, [searchTerm]);

const filtered = items.filter(item => item.name?.includes(searchTerm));
const paged    = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
```

### 削除確認モーダル

```jsx
const [showDeleteDialog, setShowDeleteDialog] = useState(false);

// PageHeader の actions に追加
<Button variant="danger" onClick={() => setShowDeleteDialog(true)}>削除する</Button>

// ページ末尾に配置
<Modal
  open={showDeleteDialog}
  onClose={() => setShowDeleteDialog(false)}
  title="削除の確認"
  footer={
    <>
      <Button variant="secondary" onClick={() => setShowDeleteDialog(false)}>キャンセル</Button>
      <Button variant="danger" onClick={handleDelete}>削除する</Button>
    </>
  }
>
  <p className="text-sm text-gray-600 leading-relaxed">
    このデータを削除しますか？この操作は取り消せません。
  </p>
</Modal>
```
