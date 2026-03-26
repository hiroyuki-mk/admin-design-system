/**
 * PageHeader — Admin Design System
 *
 * ページ上部のタイトル + サブテキスト + アクションボタン群を統一する。
 *
 * props:
 *   title:    ページタイトル（h1）
 *   subtitle: サブテキスト（省略可）
 *   actions:  右側に表示する要素（Button など）を配列 or 単一要素で渡す
 *
 * 使用例（一覧画面）:
 *   <PageHeader
 *     title="作業設計 - 一覧"
 *     subtitle="登録済みの作業設計を確認・編集できます"
 *   />
 *
 * 使用例（登録画面）:
 *   <PageHeader
 *     title="作業設計 - 登録"
 *     subtitle="依頼メールや添付概要から、公演登録に必要な情報を登録してください"
 *     actions={[
 *       <Button key="submit" onClick={handleSubmit}>登録する</Button>,
 *       <Button key="back" variant="secondary" onClick={() => navigate(-1)}>戻る</Button>,
 *     ]}
 *   />
 *
 * 使用例（編集画面）:
 *   <PageHeader
 *     title="○○ - 編集"
 *     actions={[
 *       <Button key="update" onClick={handleUpdate}>更新する</Button>,
 *       <Button key="back" variant="secondary" onClick={() => navigate(-1)}>戻る</Button>,
 *       <Button key="delete" variant="danger" onClick={() => setShowDeleteDialog(true)}>削除する</Button>,
 *     ]}
 *   />
 *
 * 使用例（詳細画面）:
 *   <PageHeader
 *     title="○○ - 詳細"
 *     actions={[
 *       <Button key="edit" onClick={() => navigate(`/edit/${id}`)}>編集する</Button>,
 *       <Button key="back" variant="secondary" onClick={() => navigate(-1)}>戻る</Button>,
 *     ]}
 *   />
 */

export function PageHeader({ title, subtitle, actions }) {
  const actionArray = actions
    ? Array.isArray(actions) ? actions : [actions]
    : [];

  return (
    <div className="flex items-start justify-between gap-6 mb-6">
      {/* 左：タイトル + サブテキスト */}
      <div className="flex-1 min-w-0">
        <h1 className="text-[28px] font-bold text-gray-900 leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 text-sm text-gray-500">{subtitle}</p>
        )}
      </div>

      {/* 右：アクションボタン群 */}
      {actionArray.length > 0 && (
        <div className="flex items-center gap-3 shrink-0 pt-1">
          {actionArray}
        </div>
      )}
    </div>
  );
}
