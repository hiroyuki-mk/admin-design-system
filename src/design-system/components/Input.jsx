/**
 * Input / Textarea / Checkbox — Admin Design System
 *
 * <Input>
 *   type:        'text' | 'email' | 'password' | etc. (default: 'text')
 *   error:       エラーメッセージ文字列（truthy で赤ボーダー）
 *   readOnly:    true で背景グレー
 *   width:       Tailwind の width クラス or 'full'(default) | 'auto'
 *
 * 使用例:
 *   <Input name="title" value={v} onChange={handleChange} placeholder="タイトル" />
 *   <Input name="url" value={v} onChange={handleChange} error={urlError} />
 *   <Input name="code" value={v} onChange={handleChange} readOnly width="w-28" />
 *
 * <Textarea>
 *   rows:  行数 (default: 4)
 *
 * 使用例:
 *   <Textarea name="memo" value={v} onChange={handleChange} rows={6} />
 *
 * <Checkbox>
 *   label: チェックボックス横のテキスト
 *
 * 使用例:
 *   <Checkbox
 *     name="hasTicketDistribution"
 *     checked={formData.hasTicketDistribution}
 *     onChange={(e) => setFormData(p => ({ ...p, hasTicketDistribution: e.target.checked }))}
 *     label="あり"
 *   />
 */

const baseInput = [
  'px-3.5 py-2.5',            // padding: 10px 14px
  'text-sm text-gray-900',
  'border border-gray-300 rounded-input',
  'bg-white',
  'outline-none',
  'transition-colors duration-150',
  'focus:border-primary',
  'placeholder:text-gray-400',
].join(' ');

/* ---------- Input ---------- */
export function Input({
  name,
  value,
  onChange,
  onBlur,
  type = 'text',
  placeholder = '',
  readOnly = false,
  disabled = false,
  error = '',
  width = 'w-full',
  className = '',
  ...rest
}) {
  const classes = [
    baseInput,
    width,
    readOnly || disabled
      ? 'bg-gray-100 text-gray-500 cursor-default'
      : '',
    error
      ? 'border-danger bg-danger-light focus:border-danger'
      : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className="flex flex-col gap-1.5">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        readOnly={readOnly}
        disabled={disabled}
        className={classes}
        {...rest}
      />
      {error && (
        <span className="text-xs text-danger">{error}</span>
      )}
    </div>
  );
}

/* ---------- Textarea ---------- */
export function Textarea({
  name,
  value,
  onChange,
  onBlur,
  onPaste,
  placeholder = '',
  rows = 4,
  error = '',
  className = '',
  ...rest
}) {
  const classes = [
    baseInput,
    'w-full resize-y font-inherit leading-relaxed',
    error
      ? 'border-danger bg-danger-light focus:border-danger'
      : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className="flex flex-col gap-1.5">
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onPaste={onPaste}
        placeholder={placeholder}
        rows={rows}
        className={classes}
        {...rest}
      />
      {error && (
        <span className="text-xs text-danger">{error}</span>
      )}
    </div>
  );
}

/* ---------- Checkbox ---------- */
export function Checkbox({
  name,
  checked,
  onChange,
  label = '',
  disabled = false,
}) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer select-none">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="w-4.5 h-4.5 accent-primary cursor-pointer"
      />
      {label && (
        <span className="text-sm text-gray-700">{label}</span>
      )}
    </label>
  );
}
