/**
 * Modal — Admin Design System
 *
 * 削除確認ダイアログ・選択モーダル等に使用する共通モーダル。
 *
 * props:
 *   open:      表示/非表示
 *   onClose:   閉じる処理（オーバーレイクリック時も呼ばれる）
 *   title:     モーダルタイトル
 *   children:  本文コンテンツ
 *   footer:    フッター（ボタン群）省略可
 *   width:     'sm' | 'md'(default) | 'lg'
 *
 * 使用例（削除確認）:
 *   <Modal
 *     open={showDeleteDialog}
 *     onClose={() => setShowDeleteDialog(false)}
 *     title="削除の確認"
 *     footer={
 *       <>
 *         <Button variant="secondary" onClick={() => setShowDeleteDialog(false)}>キャンセル</Button>
 *         <Button variant="danger" onClick={handleDelete}>削除する</Button>
 *       </>
 *     }
 *   >
 *     <p className="text-sm text-gray-600 leading-relaxed">
 *       このデータを削除しますか？この操作は取り消せません。
 *     </p>
 *   </Modal>
 *
 * 使用例（名前入力モーダル）:
 *   <Modal open={showNameModal} onClose={() => {}} title="作業者名の設定">
 *     <p className="text-sm text-gray-500 mb-6 leading-relaxed">
 *       登録・編集時に記録される作業者名を入力してください。
 *     </p>
 *     <Input ... />
 *     <div className="mt-6">
 *       <Button size="lg" className="w-full" onClick={handleSaveName}>保存する</Button>
 *     </div>
 *   </Modal>
 */

const widthClasses = {
  sm: 'w-full max-w-sm',
  md: 'w-full max-w-md',
  lg: 'w-full max-w-lg',
};

export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  width = 'md',
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999] p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={[
          widthClasses[width],
          'bg-white rounded-card shadow-modal p-8',
        ].join(' ')}
      >
        {/* タイトル */}
        <h2 className="text-xl font-bold text-gray-900 mb-2">{title}</h2>

        {/* 本文 */}
        <div>{children}</div>

        {/* フッター */}
        {footer && (
          <div className="flex justify-end gap-3 mt-6">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
