import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { deleteItem, getItems, postItem } from "../services/api/items";
import { getApiErrorMessage } from "../services/api/error";
import { Modal } from "../uiParts/Modal";
import { ItemForm } from "../uniqueParts/items/ItemForm";
import { ItemsTable } from "../uniqueParts/items/ItemsTable";

export function ItemsPage() {
  const queryClient = useQueryClient();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const itemsQuery = useQuery({
    queryKey: ["items"],
    queryFn: getItems,
  });

  const createMutation = useMutation({
    mutationFn: postItem,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["items"] });
      setIsCreateModalOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  return (
    <main className="app-page">
      <header className="app-header">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="app-h1">学習項目</h1>
            <p className="app-muted">項目を追加し、次回復習予定日を確認します。</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link className="app-button-secondary" to="/review">
              復習
            </Link>
            <Link className="app-button-secondary" to="/presets">
              プリセット
            </Link>
            <Link className="app-button-secondary" to="/stats">
              集計
            </Link>
          </div>
        </div>
      </header>

      {isCreateModalOpen && (
        <Modal
          title="学習項目を追加"
          onClose={() => {
            setIsCreateModalOpen(false);
          }}
          footer={
            <>
              <button
                type="button"
                className="app-button-secondary"
                onClick={() => setIsCreateModalOpen(false)}
              >
                キャンセル
              </button>
              <button
                type="submit"
                form="item-create-form"
                className="app-button-primary"
                disabled={createMutation.isPending}
              >
                {createMutation.isPending ? "追加中..." : "追加"}
              </button>
            </>
          }
        >
          <ItemForm
            formId="item-create-form"
            isSubmitting={createMutation.isPending}
            onSubmit={(value) => createMutation.mutate(value)}
          />
          {createMutation.isError && (
            <div className="app-error-box">
              {getApiErrorMessage(createMutation.error) ?? "追加に失敗しました。"}
            </div>
          )}
        </Modal>
      )}

      <section className="app-card">
        <div className="flex items-center justify-between gap-3">
          <h2 className="app-h2">一覧</h2>
          <button
            type="button"
            className="app-button-primary w-auto"
            onClick={() => {
              createMutation.reset();
              setIsCreateModalOpen(true);
            }}
          >
            新規
          </button>
        </div>
        {itemsQuery.isLoading && <p className="app-muted">読み込み中...</p>}
        {itemsQuery.isError && (
          <div className="app-error-box">
            {getApiErrorMessage(itemsQuery.error) ?? "取得に失敗しました。"}
          </div>
        )}
        {itemsQuery.data && (
          <ItemsTable
            items={itemsQuery.data.items}
            onDelete={(id) => deleteMutation.mutate(id)}
            deletingItemId={deleteMutation.isPending ? deleteMutation.variables : undefined}
            deleteErrorItemId={deleteMutation.isError ? deleteMutation.variables : undefined}
          />
        )}
      </section>
    </main>
  );
}
