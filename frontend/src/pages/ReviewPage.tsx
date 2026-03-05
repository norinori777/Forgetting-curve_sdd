import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { compareIsoDate, todayIsoDate } from "@fc/shared";

import { getItems } from "../services/api/items";
import { getApiErrorMessage } from "../services/api/error";
import { postReview } from "../services/api/reviews";
import { ReviewForm } from "../uniqueParts/review/ReviewForm";

type Scope = "due" | "overdue" | "all";

function parseScope(value: string | null): Scope {
  if (value === "overdue" || value === "all" || value === "due") return value;
  return "due";
}

export function ReviewPage() {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const today = todayIsoDate();

  const scope = parseScope(searchParams.get("scope"));
  const tag = (searchParams.get("tag") ?? "").trim();
  const selectedItemId = searchParams.get("itemId") ?? "";

  const itemsQuery = useQuery({
    queryKey: ["items"],
    queryFn: getItems,
  });

  const candidates = useMemo(() => {
    const items = itemsQuery.data?.items ?? [];
    return items.filter(({ item, schedule }) => {
      const tagOk = tag ? item.tags.includes(tag) : true;
      if (!tagOk) return false;

      if (scope === "all") return true;
      if (scope === "overdue") return compareIsoDate(schedule.dueOn, today) < 0;
      return compareIsoDate(schedule.dueOn, today) <= 0;
    });
  }, [itemsQuery.data, scope, tag, today]);

  const selected = candidates.find((c) => c.item.id === selectedItemId) ?? null;

  const reviewMutation = useMutation({
    mutationFn: async (value: {
      reviewedOn: string;
      result: "success" | "failure";
      difficulty?: number;
      memo?: string;
    }) => {
      if (!selected) {
        throw new Error("No item selected");
      }
      return postReview(selected.item.id, value);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["items"] });
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.delete("itemId");
        return next;
      });
    },
  });

  const reviewError = reviewMutation.isError
    ? getApiErrorMessage(reviewMutation.error) ?? "記録に失敗しました。"
    : null;

  return (
    <main className="app-page">
      <header className="app-header">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="app-h1">復習</h1>
            <p className="app-muted">対象を選び、成功/失敗を記録します。</p>
          </div>
        </div>
      </header>

      <section className="app-card">
        <h2 className="app-h2">対象条件</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="app-field">
            <label className="app-label">範囲</label>
            <select
              className="app-input"
              value={scope}
              onChange={(e) => {
                const nextScope = parseScope(e.target.value);
                setSearchParams((prev) => {
                  const next = new URLSearchParams(prev);
                  next.set("scope", nextScope);
                  next.delete("itemId");
                  return next;
                });
              }}
            >
              <option value="due">期限到来（今日まで）</option>
              <option value="overdue">期限切れのみ</option>
              <option value="all">すべて</option>
            </select>
          </div>
          <div className="app-field">
            <label className="app-label">タグ（任意）</label>
            <input
              className="app-input"
              value={tag}
              placeholder="english"
              onChange={(e) => {
                const nextTag = e.target.value;
                setSearchParams((prev) => {
                  const next = new URLSearchParams(prev);
                  if (nextTag.trim()) next.set("tag", nextTag);
                  else next.delete("tag");
                  next.delete("itemId");
                  return next;
                });
              }}
            />
          </div>
        </div>
      </section>

      <section className="app-card">
        <h2 className="app-h2">候補</h2>
        {itemsQuery.isLoading && <p className="app-muted">読み込み中...</p>}
        {itemsQuery.isError && (
          <div className="app-error-box">
            {getApiErrorMessage(itemsQuery.error) ?? "取得に失敗しました。"}
          </div>
        )}
        {itemsQuery.data && candidates.length === 0 && (
          <p className="app-muted">条件に一致する項目がありません。</p>
        )}
        {itemsQuery.data && candidates.length > 0 && (
          <div className="grid gap-2">
            {candidates.map(({ item, schedule }) => {
              const isSelected = item.id === selectedItemId;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={
                    isSelected
                      ? "app-button-primary justify-start"
                      : "app-button-secondary justify-start"
                  }
                  onClick={() => {
                    setSearchParams((prev) => {
                      const next = new URLSearchParams(prev);
                      next.set("itemId", item.id);
                      return next;
                    });
                  }}
                >
                  <span className="font-medium">{item.title}</span>
                  <span className="ml-2 text-xs opacity-80">due: {schedule.dueOn}</span>
                </button>
              );
            })}
          </div>
        )}
      </section>

      {selected && (
        <section className="app-card">
          <h2 className="app-h2">記録</h2>
          <p className="app-muted">{selected.item.title}</p>
          <ReviewForm
            defaultReviewedOn={today}
            isSubmitting={reviewMutation.isPending}
            onSubmit={(value) => {
              reviewMutation.mutate(value);
            }}
          />
          {reviewError && <div className="app-error-box">{reviewError}</div>}
        </section>
      )}
    </main>
  );
}
