# Admin Design System

React + Vite + Tailwind CSS v4 + Firebase 構成の管理サイト用デザインシステム。
このドキュメントを Claude に添付することで、毎回デザイン指示をしなくても一貫した UI が作れる。

**バージョン**: v1.3  
**最終更新**: 2026-03-28

---

## 設計方針

### このドキュメントの使い方

複数プロジェクトで共通して使う UI の定義書。Claude にこのファイルを添付することで、デザイン指示なしに一貫した UI が作れる。

### コンポーネントの整理ルール

- **各コンポーネントセクション内にパターンを収録する。** 「テーブルを作りたい」→ `DataTable` セクションを見れば基本パターンも応用パターンも揃っている状態を目指す。
- **「よくある実装パターン」は複数コンポーネントをまたぐものに限定する。** 単一コンポーネントのパターンはそのコンポーネントのセクションに入れる。

### 新しいコンポーネント・パターンの追加判断

| 種別 | 対応 |
|---|---|
| 汎用性が高い（複数プロジェクトで使える） | コンポーネントとしてデザインシステムに追加 |
| 汎用性が低い（プロジェクト固有） | 追加するかどうかオーナーに確認してから追加 |

**Claude はこの判断を自動で行い、汎用性が低いと判断した場合は必ず確認を取ること。**

### デザインシステム更新のフロー

```
① 新プロジェクトで新しい UI が必要になる
         ↓
② Claude が汎用性を判断
   ・汎用性あり → コンポーネントとして実装 + DESIGN_SYSTEM.md を更新
   ・汎用性なし → オーナーに確認してから判断
         ↓
③ 承認されたら admin-design-system リポジトリに追加
         ↓
④ 各プロジェクトへ手動コピー
```

**このドキュメントが常に最新であることが唯一のルール。**

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
| `--color-gray-100` | `#F3F4F6` | 読取専用 input 背景・テーブルヘッダ・ghost ボタン背景 |
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
| `--radius-input` | 8px | input・button（md/lg）・ページネーション |
| `--radius-badge` | 6px | バッジ・ドロップダウン・ghost ボタン |
| `--shadow-card` | `0 1px 3px rgba(0,0,0,0.1)` | カード |
| `--shadow-modal` | `0 20px 60px rgba(0,0,0,0.2)` | モーダル |
| `--shadow-dropdown` | `0 4px 16px rgba(0,0,0,0.12)` | ドロップダウン |

---

## コンポーネント仕様

### Button

```jsx
import { Button } from '../design-system';

// variant: 'primary'(default) | 'secondary' | 'danger' | 'ghost'
// size:    'md'(default) | 'lg' | 'sm'
```

| variant | 用途 | スタイル |
|---|---|---|
| `primary` | 登録・更新など主要アクション | 青背景・白テキスト |
| `secondary` | 戻るボタン | 白背景・グレーボーダー |
| `danger` | 削除ボタン | 赤背景・白テキスト |
| `ghost` | **テーブル内の編集ボタン** | `#F3F4F6` 背景・ボーダーなし |

| size | padding | 用途 |
|---|---|---|
| `md` | `10px 20px` | 通常ボタン（登録・更新・戻る・削除） |
| `lg` | `10px 32px` | 横幅が必要な場面（保存ボタン全幅など） |
| `sm` | `8px 16px` | **テーブル内の編集ボタン** |

```jsx
<Button onClick={handleSubmit}>登録する</Button>
<Button variant="secondary" onClick={() => navigate(-1)}>戻る</Button>
<Button variant="danger" onClick={() => setShowDelete(true)}>削除する</Button>
<Button variant="ghost" size="sm" onClick={() => navigate(`/edit/${row.id}`)}>編集</Button>
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

**テーブル内編集ボタン（必ずこのスタイルを使う）:**
```jsx
<Button variant="ghost" size="sm" onClick={() => navigate(`/edit/${row.id}`)}>編集</Button>
```

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
```

**Card 内にテーブルを表示する場合（タイトル + 枠付きテーブル）:**

```jsx
<Card padding="none">
  <div className="p-8 pb-0">
    <SectionTitle>セクション名</SectionTitle>
  </div>
  <div className="px-8 pb-8">
    <div className="rounded-card border border-gray-200 overflow-hidden">
      <table className="w-full text-sm">
        ...
      </table>
    </div>
  </div>
</Card>
```

- `SectionTitle` が持つ `mb-5` がそのままテーブルとの間隔として機能するため `pb-0` にする
- テーブルを `rounded-card border` のラッパーで囲むことでカード内に浮いた形になる

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
  { key: '_actions', label: '', width: 'w-24', align: 'right' },  // ← align: 'right' 必須
];

<DataTable
  columns={columns}
  rows={pagedItems}
  renderCell={(row, key) => {
    if (key === '_actions') return (
      <Button variant="ghost" size="sm" onClick={() => navigate(`/edit/${row.id}`)}>編集</Button>
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

**DataTable の列定義ルール:**
- `align: 'right'` を指定した列はテキスト省略（overflow-hidden）が無効になる
- アクションボタン列は必ず `align: 'right'` を指定する

#### Rowspan テーブル（グループ化・チェックボックス一括削除）

Firestore からフラットに取得したレコードを特定キーでグループ化して rowspan 表示する。DataTable コンポーネントでは rowspan が扱えないため手書きの `<table>` で実装する。

```jsx
// フラットなレコードを連続する同一キーでグループ化
function groupRecords(records) {
  const groups = [];
  let current = null;
  for (const record of records) {
    const key = `${record.date}||${record.from}||${record.subject}`;
    if (current && current.key === key) {
      current.rows.push(record);
    } else {
      current = { key, rows: [record] };
      groups.push(current);
    }
  }
  return groups;
}

// state
const [selected, setSelected] = useState(new Set()); // グループキーのSet

const toggleGroup = (key) => {
  setSelected(prev => {
    const next = new Set(prev);
    next.has(key) ? next.delete(key) : next.add(key);
    return next;
  });
};

// 全選択（indeterminate 対応）
const pagedKeys   = paged.map(g => g.key);
const allSelected = pagedKeys.length > 0 && pagedKeys.every(k => selected.has(k));
const someSelected = pagedKeys.some(k => selected.has(k));

// レンダリング
<table className="w-full text-sm border-collapse">
  <thead>
    <tr className="bg-gray-100 border-b border-gray-200">
      <th className="px-4 py-3 w-10">
        <input
          type="checkbox"
          checked={allSelected}
          ref={el => { if (el) el.indeterminate = someSelected && !allSelected; }}
          onChange={toggleAll}
          className="w-4 h-4 cursor-pointer accent-primary"
        />
      </th>
      <th className="text-left px-4 py-3 ...">日付</th>
      {/* 他の列ヘッダー */}
    </tr>
  </thead>
  <tbody>
    {paged.map((group, gi) => {
      const { key, rows } = group;
      const isChecked = selected.has(key);
      const bgClass = isChecked ? 'bg-primary-light' : gi % 2 === 0 ? '' : 'bg-gray-50/50';
      return rows.map((row, ri) => (
        <tr key={row.id} className={bgClass}>
          {ri === 0 && (
            <>
              <td rowSpan={rows.length} className="px-4 py-2.5 align-top border-b border-gray-200">
                <input type="checkbox" checked={isChecked} onChange={() => toggleGroup(key)}
                  className="w-4 h-4 cursor-pointer accent-primary" />
              </td>
              <td rowSpan={rows.length} className="px-4 py-2.5 text-sm align-top border-b border-gray-200">
                {row.date}
              </td>
            </>
          )}
          <td className="px-4 py-2.5 text-sm border-b border-gray-200">{row.worker}</td>
        </tr>
      ));
    })}
  </tbody>
</table>
```

**注意事項:**
- `border-collapse` を `table` に指定しないと rowspan のボーダーが正しく機能しない
- グループ化は**連続する行**に対して行う。Firestore の `orderBy` がグループの連続性を保証する必要がある
- 選択行のハイライトは `bg-primary-light`（薄青）を使う

---

### Modal

```jsx
import { Modal } from '../design-system';

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

#### エラーモーダル

処理結果がエラーの場合に使用。「閉じる」ボタンのみ。

```jsx
<Modal
  open={modal?.type === 'error'}
  onClose={closeModal}
  title="処理結果"
  footer={<Button variant="secondary" onClick={closeModal}>閉じる</Button>}
>
  <p className="text-sm text-gray-600 mb-3 leading-relaxed">
    以下のエラーを修正してから再度お試しください。
  </p>
  <div className="bg-danger-light border border-danger rounded-input p-4">
    {errors.map((e, i) => (
      <p key={i} className="text-sm text-danger mb-1 last:mb-0">• {e}</p>
    ))}
  </div>
</Modal>
```

#### 確認モーダル（件数表示付き）

インポートなど件数を伴う処理の前確認に使用。

```jsx
<Modal
  open={modal?.type === 'confirm'}
  onClose={closeModal}
  title="処理の確認"
  footer={
    <>
      <Button variant="secondary" onClick={closeModal}>キャンセル</Button>
      <Button onClick={handleExecute}>実行する</Button>
    </>
  }
>
  <p className="text-sm text-gray-600 mb-5 leading-relaxed">
    以下の内容で処理します。よろしいですか？
  </p>
  <div className="bg-primary-light border border-primary rounded-input px-5 py-4 text-center">
    <p className="text-xs text-primary font-semibold mb-1">処理件数</p>
    <p className="text-3xl font-bold text-primary">
      {count}<span className="text-base ml-1">件</span>
    </p>
  </div>
</Modal>
```

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

## よくある実装パターン

*複数コンポーネントをまたぐパターン、または App 固有の実装をここに記載する。*
*単一コンポーネントのパターンは各コンポーネントのセクションに記載すること。*

### 読取専用 Input（マスタ自動入力）

```jsx
<FormField
  label={<>取引先コード <BadgeLabel color="success">✓ マスタから自動入力</BadgeLabel></>}
>
  <Input name="clientCode" value={formData.clientCode} onChange={handleChange}
    readOnly={clientLocked} width="w-28" />
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

### ヘッダーのドロップダウンナビゲーション（App.jsx 固有）

サブメニューを持つナビは `DropdownNavMenu` コンポーネントとして App.jsx に実装する。ボタンとドロップダウンの間に `h-[4px]` の透明ブリッジを配置して `onMouseLeave` の誤発火を防ぐ。

```jsx
function DropdownNavMenu({ label, basePath, items }) {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const isActive = location.pathname.startsWith(basePath);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative" onMouseLeave={() => setOpen(false)}>
      <button
        onMouseEnter={() => setOpen(true)}
        onClick={() => setOpen(v => !v)}
        className={[
          'text-sm font-semibold px-3 py-2 rounded-badge transition-all duration-150',
          'border-none cursor-pointer flex items-center gap-1 font-[inherit]',
          isActive ? 'text-primary bg-primary-light' : 'text-gray-500 bg-transparent hover:bg-gray-100',
        ].join(' ')}
      >
        {label}
        <span className="text-[10px] opacity-70">▼</span>
      </button>

      {open && (
        <>
          {/* 透明ブリッジ：隙間での onMouseLeave 誤発火を防ぐ */}
          <div className="absolute top-full left-0 w-full h-[4px]" />
          <div className="absolute top-[calc(100%+4px)] left-0 bg-white rounded-input border border-gray-200 min-w-40 z-[1000] shadow-dropdown overflow-hidden">
            {items.map(item => (
              <Link key={item.to} to={item.to} onClick={() => setOpen(false)}
                className={[
                  'block px-4 py-3 text-sm font-medium no-underline transition-colors duration-100',
                  location.pathname.startsWith(item.to)
                    ? 'text-primary bg-primary-light' : 'text-gray-700 hover:bg-gray-50',
                ].join(' ')}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
```

### loading 状態と ref の共存（contentEditable など）

`if (loading) return` の早期 return を使うと、フォーム DOM がマウントされる前に ref へのアクセスが発生し `ref.current` が `null` になる。`hidden` で切り替えることで DOM を常に保持する。

```jsx
// NG: loading 中にフォームDOMが存在しないため ref が null になる
if (loading) return <div>読み込み中...</div>;

// OK: loading 中も DOM を保持し続ける
return (
  <div>
    {loading && <div className="flex items-center justify-center py-20">読み込み中...</div>}
    <div className={loading ? 'hidden' : ''}>
      {/* ref を使うコンポーネントを含むフォーム全体 */}
    </div>
  </div>
);
```

---

## 変更履歴

| バージョン | 日付 | 内容 |
|---|---|---|
| v1.3 | 2026-03-28 | 設計方針セクション追加 / コンポーネント内パターン整理（DataTableにrowspan・ModalにErrorモーダル・確認モーダルを統合）/ よくある実装パターンをコンポーネント横断のものに限定 |
| v1.2 | 2026-03-28 | DropdownNavMenu パターン追加 / Card内テーブルパターン更新 / loading + ref の注意事項追加 / rowspanテーブル・チェックボックス一括削除パターン追加 |
| v1.1 | 2026-03-26 | Button に `ghost` variant・`sm` size 追加 / `leading-none` 削除によるボタン高さ修正 / Table アクション列の padding 修正 |
| v1.0 | 2026-03-26 | 初版リリース |
