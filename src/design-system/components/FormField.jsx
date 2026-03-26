/**
 * FormField — Admin Design System
 *
 * label + 入力要素（子要素）+ ヒントテキストをセットで扱う。
 * children に Input / Textarea / Checkbox 等を渡す。
 *
 * props:
 *   label:    ラベルテキスト（省略可）
 *   hint:     ラベル横に小さく表示する補足テキスト（省略可）
 *   required: true で「必須」バッジを表示
 *   last:     true で下マージンをゼロに（カード末尾フィールドに使用）
 *
 * 使用例（基本）:
 *   <FormField label="タイトル">
 *     <Input name="title" value={v} onChange={handleChange} />
 *   </FormField>
 *
 * 使用例（ヒント付き）:
 *   <FormField label="一般発売日" hint="［９］一般発売 >《一般発売日》">
 *     <div className="flex gap-3">
 *       <Input name="generalSaleDate" value={v} onChange={handleChange} width="w-60" />
 *       <Input name="generalSaleTime" value={v} onChange={handleChange} width="w-28" />
 *     </div>
 *   </FormField>
 *
 * 使用例（必須バッジ + カード末尾）:
 *   <FormField label="取引先名称" required last>
 *     <Input name="clientName" value={v} onChange={handleChange} />
 *   </FormField>
 *
 * ─────────────────────────────────────────
 * BadgeLabel — インラインバッジ（マスタ自動入力など）
 *
 * 使用例:
 *   <FormField
 *     label={<>取引先コード <BadgeLabel color="success">✓ マスタから自動入力</BadgeLabel></>}
 *   >
 *     <Input ... />
 *   </FormField>
 */

export function FormField({
  label,
  hint,
  required = false,
  last = false,
  children,
}) {
  return (
    <div className={last ? '' : 'mb-6'}>
      {label && (
        <label className="flex flex-wrap items-baseline gap-1.5 mb-2">
          <span className="text-sm font-semibold text-gray-700">
            {label}
          </span>
          {required && (
            <span className="text-xs font-semibold text-danger bg-danger-light px-1.5 py-0.5 rounded">
              必須
            </span>
          )}
          {hint && (
            <span className="text-xs text-gray-500 font-normal">{hint}</span>
          )}
        </label>
      )}
      {children}
    </div>
  );
}

/**
 * BadgeLabel — ラベル内インラインバッジ
 * color: 'success' | 'primary' | 'danger' | 'gray'
 */
const badgeColors = {
  success: 'text-success bg-success-light',
  primary: 'text-primary bg-primary-light',
  danger:  'text-danger bg-danger-light',
  gray:    'text-gray-500 bg-gray-100',
};

export function BadgeLabel({ children, color = 'gray' }) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1',
        'text-xs font-medium px-2 py-0.5 rounded-badge',
        badgeColors[color] || badgeColors.gray,
      ].join(' ')}
    >
      {children}
    </span>
  );
}
