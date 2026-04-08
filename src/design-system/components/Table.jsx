/**
 * Table / Pagination / SearchInput — Admin Design System
 *
 * 一覧画面のテーブル・ページネーション・検索バーを統一する。
 *
 * ─────────────────────────────────────────
 * <SearchInput>
 *   value:       検索文字列（state）
 *   onChange:    入力値の更新のみ（クエリは発火しない）
 *   onSearch:    Enter キー押下時に呼ばれる（クエリ実行）
 *   onClear:     × ボタン押下時に呼ばれる（クリア＋先頭ページに戻る）
 *   placeholder: プレースホルダー文字列
 *
 * 使用例:
 *   <SearchInput
 *     value={searchTerm}
 *     onChange={setSearchTerm}
 *     onSearch={execSearch}
 *     onClear={clearSearch}
 *     placeholder="件名で検索（前方一致）"
 *   />
 *
 * 備考:
 *   - 入力中はクエリを発火しない（Enter キーで実行）
 *   - value が空でない場合のみ × ボタンを表示
 *   - カーソルページネーション（useSearchablePagination）と組み合わせて使用する
 *   - 検索中（isSearching=true）はページャーの << / >> を非表示にすること
 *     （limitToLast と startAt/endAt の併用不可のため）
 *
 * ─────────────────────────────────────────
 * <DataTable>
 *   columns: { key, label, width?, align? }[]
 *   rows:    任意データ配列
 *   renderCell: (row, colKey) => ReactNode   ← セル描画
 *   onRowClick?: (row) => void               ← 行クリック（省略可）
 *   emptyMessage?: string                    ← データなし時のテキスト
 *
 * 使用例:
 *   <DataTable
 *     columns={[
 *       { key: 'requestNumber', label: '依頼メールタイトル' },
 *       { key: 'worker',        label: '作業者', width: 'w-32' },
 *       { key: 'createdAt',     label: '登録日時', width: 'w-40' },
 *       { key: '_actions',      label: '',        width: 'w-24', align: 'right' },
 *     ]}
 *     rows={pagedWorks}
 *     renderCell={(row, key) => {
 *       if (key === 'requestNumber') return (
 *         <button onClick={() => navigate(`/detail/${row.id}`)} className="text-primary font-bold ...">
 *           {row.requestNumber}
 *         </button>
 *       );
 *       if (key === '_actions') return (
 *         <Button size="sm" variant="secondary" onClick={() => navigate(`/edit/${row.id}`)}>編集</Button>
 *       );
 *       return row[key] ?? '-';
 *     }}
 *   />
 *
 * ─────────────────────────────────────────
 * <Pagination>
 *   total:       全件数
 *   pageSize:    1ページあたり件数
 *   currentPage: 現在ページ（1始まり）
 *   onPageChange: (page: number) => void
 *
 * 使用例:
 *   <Pagination
 *     total={filteredWorks.length}
 *     pageSize={PAGE_SIZE}
 *     currentPage={currentPage}
 *     onPageChange={setCurrentPage}
 *   />
 */

/* ---------- DataTable ---------- */
export function DataTable({
  columns = [],
  rows = [],
  renderCell,
  onRowClick,
  emptyMessage = 'データがありません',
}) {
  return (
    <div className="bg-white rounded-card shadow-card overflow-hidden">
      <table className="w-full border-collapse table-fixed">
        {/* colgroup で幅を指定 */}
        <colgroup>
          {columns.map((col) => (
            <col key={col.key} className={col.width || ''} />
          ))}
        </colgroup>

        {/* thead */}
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={[
                  'px-6 py-3 text-sm font-semibold text-gray-700',
                  col.align === 'right' ? 'text-right' : 'text-left',
                  'whitespace-nowrap',
                ].join(' ')}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        {/* tbody */}
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-12 text-center text-sm text-gray-400"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row, rowIdx) => (
              <tr
                key={row.id ?? rowIdx}
                onClick={() => onRowClick?.(row)}
                className={[
                  rowIdx < rows.length - 1 ? 'border-b border-gray-200' : '',
                  onRowClick ? 'cursor-pointer hover:bg-gray-50' : 'hover:bg-gray-50',
                  'transition-colors duration-100',
                ].join(' ')}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={[
                      'py-4 text-sm text-gray-800',
                      col.align === 'right'
                        ? 'text-right pl-2 pr-6'
                        : 'px-6 overflow-hidden text-ellipsis whitespace-nowrap',
                    ].join(' ')}
                  >
                    {renderCell ? renderCell(row, col.key) : (row[col.key] ?? '-')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- Pagination ---------- */
export function Pagination({ total, pageSize, currentPage, onPageChange }) {
  const totalPages = Math.ceil(total / pageSize);
  if (totalPages <= 1) return null;

  const start = (currentPage - 1) * pageSize + 1;
  const end   = Math.min(currentPage * pageSize, total);

  return (
    <div className="flex justify-between items-center px-6 py-4 border-t border-gray-200 bg-gray-50">
      <span className="text-sm text-gray-500">
        {total} 件中 {start}〜{end} 件を表示
      </span>
      <div className="flex items-center gap-2">
        <NavButton
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ← 前へ
        </NavButton>
        <span className="text-sm text-gray-700 px-2">
          {currentPage} / {totalPages}
        </span>
        <NavButton
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          次へ →
        </NavButton>
      </div>
    </div>
  );
}

function NavButton({ children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={[
        'px-4 py-2 text-sm font-medium rounded-input border border-gray-300',
        'transition-colors duration-100',
        disabled
          ? 'bg-gray-100 text-gray-400 cursor-default pointer-events-none'
          : 'bg-white text-gray-700 hover:bg-gray-50 cursor-pointer',
      ].join(' ')}
    >
      {children}
    </button>
  );
}

/* ---------- SearchInput ---------- */
export function SearchInput({ value, onChange, onSearch, onClear, placeholder }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') onSearch(value);
  };
  return (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-80 px-3.5 py-2.5 border border-gray-300 rounded-input text-sm text-gray-900 bg-white outline-none focus:border-primary"
        style={{ paddingRight: value ? '2rem' : undefined }}
      />
      {value && (
        <button
          onClick={onClear}
          style={{
            position: 'absolute', right: '0.5rem',
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#9CA3AF', fontSize: '1rem', lineHeight: 1,
            display: 'flex', alignItems: 'center', padding: '2px',
          }}
          aria-label="クリア"
        >
          ×
        </button>
      )}
    </div>
  );
}
