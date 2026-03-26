/**
 * Button — Admin Design System
 *
 * variant: 'primary' | 'secondary' | 'danger' | 'ghost'
 * size:    'md' (default) | 'lg'
 *
 * 使用例:
 *   <Button onClick={handleSubmit}>登録する</Button>
 *   <Button variant="secondary" onClick={() => navigate(-1)}>戻る</Button>
 *   <Button variant="danger" onClick={handleDelete}>削除する</Button>
 *   <Button variant="ghost" onClick={() => navigate(`/edit/${id}`)}>編集</Button>
 *   <Button size="lg" onClick={handleSubmit}>保存する</Button>
 *   <Button disabled>処理中...</Button>
 */

const variantStyles = {
  primary: [
    'bg-primary text-white border-transparent',
    'hover:bg-primary-hover',
    'disabled:bg-gray-300 disabled:cursor-not-allowed',
  ],
  secondary: [
    'bg-white text-gray-700 border-gray-300',
    'hover:bg-gray-50',
    'disabled:text-gray-400 disabled:cursor-not-allowed',
  ],
  danger: [
    'bg-danger text-white border-transparent',
    'hover:bg-danger-hover',
    'disabled:bg-gray-300 disabled:cursor-not-allowed',
  ],
  // テーブル内の編集ボタン等に使用。bg-gray-100・ボーダーなし。
  ghost: [
    'bg-gray-100 text-gray-700 border-transparent font-medium',
    'hover:bg-gray-200',
    'disabled:text-gray-400 disabled:cursor-not-allowed',
  ],
};

const sizeStyles = {
  md: 'px-5 py-2.5 text-sm',   // padding: 10px 20px
  lg: 'px-8 py-2.5 text-sm',   // padding: 10px 32px（高さを md と統一）
  // テーブル内編集ボタン用（8px 16px）
  sm: 'px-4 py-2 text-sm',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  onClick,
  className = '',
}) {
  const base = [
    'inline-flex items-center justify-center gap-2',
    'font-semibold border rounded-button',
    'cursor-pointer transition-colors duration-150',
    'whitespace-nowrap',
  ].join(' ');

  const classes = [
    base,
    sizeStyles[size] || sizeStyles.md,
    ...(variantStyles[variant] || variantStyles.primary),
    className,
  ].join(' ');

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classes}
    >
      {children}
    </button>
  );
}


