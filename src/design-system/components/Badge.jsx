/**
 * Badge — Admin Design System
 *
 * ステータス・フラグを視覚的に示すインラインバッジ。
 *
 * color: 'primary' | 'success' | 'danger' | 'warning' | 'gray'
 *
 * 使用例:
 *   {work.hasTicketDistribution && <Badge color="danger">配券あり</Badge>}
 *   {work.hasLateTicket && <Badge color="danger">後発券</Badge>}
 *   <Badge color="primary">{c.code}</Badge>
 *   <Badge color="success">✓ マスタから自動入力</Badge>
 */

const colorClasses = {
  primary: 'bg-primary-light text-primary',
  success: 'bg-success-light text-success',
  danger:  'bg-[#ffefef] text-danger',
  warning: 'bg-yellow-100 text-yellow-800',
  gray:    'bg-gray-100 text-gray-500',
};

export function Badge({ children, color = 'gray', className = '' }) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1.5',
        'text-sm font-semibold px-5 py-1 rounded-badge',
        colorClasses[color] || colorClasses.gray,
        className,
      ].filter(Boolean).join(' ')}
    >
      {children}
    </span>
  );
}
