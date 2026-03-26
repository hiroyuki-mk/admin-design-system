/**
 * Card — Admin Design System
 *
 * props:
 *   padding:  'md' (default) | 'none'  ← 'none' はテーブルCard等で使用
 *   className: 追加クラス
 *
 * 使用例（フォームカード）:
 *   <Card>
 *     <SectionTitle>依頼情報</SectionTitle>
 *     ...fields
 *   </Card>
 *
 * 使用例（テーブルカード、padding なし）:
 *   <Card padding="none">
 *     <table>...</table>
 *   </Card>
 *
 * ─────────────────────────────────────────
 * SectionTitle — カード内セクション見出し
 *
 * 使用例:
 *   <SectionTitle>日程</SectionTitle>
 *   <SectionTitle className="mb-6">公演情報</SectionTitle>
 * ─────────────────────────────────────────
 * Divider — カード内区切り線
 *
 * 使用例:
 *   <Divider />
 */

export function Card({ children, padding = 'md', className = '' }) {
  const paddingClass = padding === 'none' ? '' : 'p-8';

  return (
    <div
      className={[
        'bg-white rounded-card overflow-hidden',
        'shadow-card',
        paddingClass,
        className,
      ].filter(Boolean).join(' ')}
    >
      {children}
    </div>
  );
}

export function SectionTitle({ children, className = '' }) {
  return (
    <div
      className={[
        'text-lg font-semibold text-gray-900 mb-5',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
}

export function Divider({ className = '' }) {
  return (
    <div
      className={[
        'border-t-2 border-gray-200 my-8',
        className,
      ].join(' ')}
    />
  );
}
