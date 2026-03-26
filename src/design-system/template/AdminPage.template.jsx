/**
 * ════════════════════════════════════════════════════════════
 *  Admin Page Template
 *  新しいページを作るときはこのファイルをコピーして使う。
 *  不要なパターンを削除し、必要な箇所を書き換える。
 * ════════════════════════════════════════════════════════════
 *
 *  収録パターン:
 *    1. ListPage    — 一覧画面（テーブル + 検索 + ページネーション）
 *    2. CreatePage  — 登録画面（2カラムフォーム）
 *    3. EditPage    — 編集画面（2カラムフォーム + 削除）
 *    4. DetailPage  — 詳細画面（2カラム表示 + コピー機能）
 *
 *  TODO コメントが付いた箇所を書き換えれば動く。
 *  ★ = 特に重要な変更箇所
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import {
  collection, doc, query, orderBy, onSnapshot,
  getDoc, addDoc, updateDoc, deleteDoc, serverTimestamp,
} from 'firebase/firestore';
import {
  Button, Input, Textarea, Checkbox,
  Card, SectionTitle, Divider,
  PageHeader, FormField,
  DataTable, Pagination,
  Modal, Badge,
} from '../design-system';

// ★ TODO: Firestoreコレクション名を変更
const COLLECTION = 'items';

// ★ TODO: ページネーション件数（必要に応じて変更）
const PAGE_SIZE = 40;


/* ════════════════════════════════════════════════════════════
   1. 一覧画面
   ════════════════════════════════════════════════════════════ */
export function ListPage() {
  const navigate = useNavigate();
  const [items, setItems]           = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Firestoreリアルタイム取得
  useEffect(() => {
    const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snap) => {
      setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
  }, []);

  // 検索ワード変更でページリセット
  useEffect(() => { setCurrentPage(1); }, [searchTerm]);

  // ★ TODO: 検索対象フィールドを変更
  const filtered = items.filter((item) =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paged = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  // ★ TODO: テーブルカラム定義を変更
  const columns = [
    { key: 'name',      label: '名称' },
    { key: 'createdAt', label: '登録日時', width: 'w-40' },
    { key: '_actions',  label: '',         width: 'w-24', align: 'right' },
  ];

  const formatDate = (ts) => {
    if (!ts) return '-';
    return ts.toDate().toLocaleString('ja-JP', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit',
    });
  };

  // ★ TODO: セル描画ロジックを変更
  const renderCell = (row, key) => {
    if (key === 'name') {
      return (
        <button
          onClick={() => navigate(`/${COLLECTION}/detail/${row.id}`)}
          className="text-primary font-bold hover:text-primary-hover truncate text-left w-full bg-transparent border-none cursor-pointer p-0 text-sm"
        >
          {row.name || '-'}
        </button>
      );
    }
    if (key === 'createdAt') return formatDate(row.createdAt);
    if (key === '_actions') {
      return (
        <Button
          size="md"
          variant="secondary"
          onClick={() => navigate(`/${COLLECTION}/edit/${row.id}`)}
        >
          編集
        </Button>
      );
    }
    return row[key] ?? '-';
  };

  return (
    <div className="min-h-screen bg-bg py-8 px-6">
      <div className="max-w-[1200px] mx-auto">

        {/* ★ TODO: タイトル・サブテキストを変更 */}
        <PageHeader
          title="○○ - 一覧"
          subtitle="登録済みのデータを確認・編集できます"
        />

        {/* 追加ボタン + 検索バー */}
        <div className="flex justify-between items-center mb-6">
          <Button onClick={() => navigate(`/${COLLECTION}/create`)}>
            追加
          </Button>
          <Input
            placeholder="検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            width="w-72"
          />
        </div>

        {/* テーブル */}
        <DataTable
          columns={columns}
          rows={paged}
          renderCell={renderCell}
          emptyMessage="データがありません"
        />

        {/* ページネーション */}
        <Pagination
          total={filtered.length}
          pageSize={PAGE_SIZE}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />

      </div>
    </div>
  );
}


/* ════════════════════════════════════════════════════════════
   2. 登録画面
   ════════════════════════════════════════════════════════════ */
export function CreatePage() {
  const navigate = useNavigate();

  // ★ TODO: フォームフィールドを定義
  const [formData, setFormData] = useState({
    name: '',
    memo: '',
    isActive: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      // ★ TODO: バリデーションを追加
      await addDoc(collection(db, COLLECTION), {
        ...formData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      // ★ TODO: 登録後の遷移先を変更
      navigate(`/${COLLECTION}`);
    } catch (err) {
      console.error('登録エラー:', err);
      alert('登録に失敗しました');
    }
  };

  return (
    <div className="min-h-screen bg-bg py-8 px-6">
      <div className="max-w-[1400px] mx-auto">

        {/* ★ TODO: タイトルを変更 */}
        <PageHeader
          title="○○ - 登録"
          subtitle="必要な情報を入力して登録してください"
          actions={[
            <Button key="submit" onClick={handleSubmit}>登録する</Button>,
            <Button key="back" variant="secondary" onClick={() => navigate(-1)}>戻る</Button>,
          ]}
        />

        {/* 2カラムレイアウト */}
        <div className="grid grid-cols-2 gap-6 items-start">

          {/* ===== 左カラム ===== */}
          <Card>
            {/* ★ TODO: セクション名を変更 */}
            <SectionTitle>基本情報</SectionTitle>

            {/* ★ TODO: フィールドを追加・変更 */}
            <FormField label="名称">
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="名称を入力"
              />
            </FormField>

            <FormField label="メモ" last>
              <Textarea
                name="memo"
                value={formData.memo}
                onChange={handleChange}
                rows={4}
              />
            </FormField>
          </Card>

          {/* ===== 右カラム ===== */}
          <div className="flex flex-col gap-6">

            <Card>
              {/* ★ TODO: セクション名を変更 */}
              <SectionTitle>詳細設定</SectionTitle>

              <FormField label="ステータス" last>
                <Checkbox
                  name="isActive"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, isActive: e.target.checked }))
                  }
                  label="有効"
                />
              </FormField>
            </Card>

          </div>
          {/* 右カラム end */}

        </div>
      </div>
    </div>
  );
}


/* ════════════════════════════════════════════════════════════
   3. 編集画面
   ════════════════════════════════════════════════════════════ */
export function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading]               = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // ★ TODO: フォームフィールドを定義（CreatePage と揃える）
  const [formData, setFormData] = useState({
    name: '',
    memo: '',
    isActive: false,
  });

  // データ取得
  useEffect(() => {
    (async () => {
      try {
        const snap = await getDoc(doc(db, COLLECTION, id));
        if (snap.exists()) {
          const d = snap.data();
          // ★ TODO: フィールドマッピングを変更
          setFormData({
            name:     d.name     || '',
            memo:     d.memo     || '',
            isActive: d.isActive || false,
          });
        } else {
          alert('データが見つかりません');
          navigate(`/${COLLECTION}`);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await updateDoc(doc(db, COLLECTION, id), {
        ...formData,
        updatedAt: serverTimestamp(),
      });
      navigate(`/${COLLECTION}/detail/${id}`);
    } catch (err) {
      console.error('更新エラー:', err);
      alert('更新に失敗しました');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, COLLECTION, id));
      navigate(`/${COLLECTION}`);
    } catch (err) {
      console.error('削除エラー:', err);
      alert('削除に失敗しました');
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-bg py-8 px-6">
      <div className="max-w-[1400px] mx-auto">

        {/* ★ TODO: タイトルを変更 */}
        <PageHeader
          title="○○ - 編集"
          actions={[
            <Button key="update" onClick={handleUpdate}>更新する</Button>,
            <Button key="back" variant="secondary" onClick={() => navigate(-1)}>戻る</Button>,
            <Button key="delete" variant="danger" onClick={() => setShowDeleteDialog(true)}>削除する</Button>,
          ]}
        />

        {/* 2カラムレイアウト（CreatePage と同構成） */}
        <div className="grid grid-cols-2 gap-6 items-start">

          <Card>
            <SectionTitle>基本情報</SectionTitle>
            <FormField label="名称">
              <Input name="name" value={formData.name} onChange={handleChange} />
            </FormField>
            <FormField label="メモ" last>
              <Textarea name="memo" value={formData.memo} onChange={handleChange} rows={4} />
            </FormField>
          </Card>

          <div className="flex flex-col gap-6">
            <Card>
              <SectionTitle>詳細設定</SectionTitle>
              <FormField label="ステータス" last>
                <Checkbox
                  name="isActive"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, isActive: e.target.checked }))
                  }
                  label="有効"
                />
              </FormField>
            </Card>
          </div>

        </div>
      </div>

      {/* 削除確認モーダル */}
      <Modal
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        title="削除の確認"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowDeleteDialog(false)}>
              キャンセル
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              削除する
            </Button>
          </>
        }
      >
        <p className="text-sm text-gray-600 leading-relaxed">
          このデータを削除しますか？この操作は取り消せません。
        </p>
      </Modal>
    </div>
  );
}


/* ════════════════════════════════════════════════════════════
   4. 詳細画面
   ════════════════════════════════════════════════════════════ */
export function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem]       = useState(null);
  const [loading, setLoading] = useState(true);
  // コピートースト
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0 });

  useEffect(() => {
    (async () => {
      try {
        const snap = await getDoc(doc(db, COLLECTION, id));
        if (snap.exists()) {
          setItem({ id: snap.id, ...snap.data() });
        } else {
          alert('データが見つかりません');
          navigate(`/${COLLECTION}`);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [id, navigate]);

  // クリックでクリップボードコピー + ツールチップ表示
  const copyToClipboard = (text, e) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({ visible: true, x: rect.left + rect.width / 2, y: rect.top - 8 });
    setTimeout(() => setTooltip({ visible: false, x: 0, y: 0 }), 1200);
  };

  if (loading) return <LoadingScreen />;
  if (!item)   return null;

  return (
    <div className="min-h-screen bg-bg py-8 px-6">
      <div className="max-w-[1400px] mx-auto">

        {/* ★ TODO: タイトルを変更 */}
        <PageHeader
          title="○○ - 詳細"
          subtitle="登録内容の確認とコピーができます"
          actions={[
            <Button key="edit" onClick={() => navigate(`/${COLLECTION}/edit/${id}`)}>編集する</Button>,
            <Button key="back" variant="secondary" onClick={() => navigate(-1)}>戻る</Button>,
          ]}
        />

        {/* 2カラムレイアウト */}
        <div className="grid grid-cols-2 gap-6 items-start">

          {/* ===== 左カラム ===== */}
          <div className="bg-white rounded-card shadow-card overflow-hidden">
            {/* ★ TODO: DetailRow / StaticRow で表示フィールドを定義 */}
            <StaticRow   label="名称"   value={item.name} />
            <CopyRow     label="メモ"   value={item.memo}  onCopy={copyToClipboard} />
          </div>

          {/* ===== 右カラム ===== */}
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-card shadow-card overflow-hidden">
              <div className="text-lg font-semibold text-gray-900 px-6 pt-5 mb-1">詳細</div>
              <StaticRow label="ステータス" value={item.isActive ? '有効' : '無効'} />
            </div>
          </div>

        </div>
      </div>

      {/* コピートースト */}
      <CopyToast tooltip={tooltip} />
    </div>
  );
}


/* ════════════════════════════════════════════════════════════
   詳細画面 共通パーツ
   ════════════════════════════════════════════════════════════ */

/** コピー可能な行 */
function CopyRow({ label, value, onCopy }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={[
        'relative px-6 py-5 border-b border-gray-200',
        'transition-colors duration-150',
        value ? 'cursor-pointer' : 'cursor-default',
        hovered && value ? 'bg-gray-100' : '',
      ].join(' ')}
      onClick={(e) => value && onCopy(value, e)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="text-xs font-semibold text-gray-500 mb-2">{label}</div>
      <div className="text-[15px] text-gray-900 whitespace-pre-wrap break-words leading-relaxed">
        {value || '-'}
      </div>
      {value && hovered && (
        <div className="absolute right-6 top-1/2 -translate-y-1/2 px-3 py-1.5 text-xs font-medium text-white bg-primary rounded-badge pointer-events-none">
          📋 コピー
        </div>
      )}
    </div>
  );
}

/** コピー不可の表示専用行 */
function StaticRow({ label, value }) {
  return (
    <div className="px-6 py-5 border-b border-gray-200 last:border-b-0">
      <div className="text-xs font-semibold text-gray-500 mb-2">{label}</div>
      <div className="text-[15px] text-gray-900 break-words leading-relaxed">
        {value || '-'}
      </div>
    </div>
  );
}

/** コピー完了ツールチップ */
function CopyToast({ tooltip }) {
  if (!tooltip.visible) return null;
  return (
    <div
      className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-full"
      style={{ left: tooltip.x, top: tooltip.y }}
    >
      <div className="bg-gray-900 text-white text-sm font-medium px-3 py-1.5 rounded-badge shadow-dropdown whitespace-nowrap">
        コピーしました！
        <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 [clip-path:polygon(0_0,100%_0,50%_100%)]" />
      </div>
    </div>
  );
}

/** ローディング */
function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-sm text-gray-500">読み込み中...</div>
    </div>
  );
}
