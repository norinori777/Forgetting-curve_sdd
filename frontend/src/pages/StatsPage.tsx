import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";

import { addDays, todayIsoDate } from "@fc/shared";

import { getApiErrorMessage } from "../services/api/error";
import { getStats } from "../services/api/stats";
import { StatsRangePicker } from "../uniqueParts/stats/StatsRangePicker";

export function StatsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const from = searchParams.get("from") ?? "";
  const to = searchParams.get("to") ?? "";

  useEffect(() => {
    if (from && to) return;
    const today = todayIsoDate();
    const nextFrom = addDays(today, -6);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("from", nextFrom);
      next.set("to", today);
      return next;
    }, { replace: true });
  }, [from, to, setSearchParams]);

  const statsQuery = useQuery({
    queryKey: ["stats", from, to],
    queryFn: () => getStats({ from, to }),
    enabled: Boolean(from && to),
  });

  const errorMessage = statsQuery.isError
    ? getApiErrorMessage(statsQuery.error) ?? "取得に失敗しました。"
    : null;

  return (
    <main className="app-page">
      <header className="app-header">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="app-h1">集計</h1>
            <p className="app-muted">指定期間の期限内/遅延/成功率を確認します。</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link className="app-button-secondary" to="/">
              学習項目
            </Link>
            <Link className="app-button-secondary" to="/review">
              復習
            </Link>
            <Link className="app-button-secondary" to="/presets">
              プリセット
            </Link>
          </div>
        </div>
      </header>

      {from && to && (
        <StatsRangePicker
          from={from}
          to={to}
          onChange={(next) => {
            setSearchParams((prev) => {
              const p = new URLSearchParams(prev);
              p.set("from", next.from);
              p.set("to", next.to);
              return p;
            });
          }}
          onLast7Days={() => {
            const today = todayIsoDate();
            const nextFrom = addDays(today, -6);
            setSearchParams((prev) => {
              const p = new URLSearchParams(prev);
              p.set("from", nextFrom);
              p.set("to", today);
              return p;
            });
          }}
        />
      )}

      {statsQuery.isLoading && <p className="app-muted">読み込み中...</p>}
      {errorMessage && <div className="app-error-box">{errorMessage}</div>}

      {statsQuery.data && (
        <section className="app-card">
          <h2 className="app-h2">結果</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            <div>
              <div className="text-sm text-slate-600">総復習数</div>
              <div className="text-lg font-semibold">{statsQuery.data.totalReviews}</div>
            </div>
            <div>
              <div className="text-sm text-slate-600">成功率</div>
              <div className="text-lg font-semibold">
                {Math.round(statsQuery.data.successRate * 100)}%
              </div>
            </div>
            <div>
              <div className="text-sm text-slate-600">期限内実施率</div>
              <div className="text-lg font-semibold">
                {Math.round(statsQuery.data.onTimeRate * 100)}%
              </div>
            </div>
            <div>
              <div className="text-sm text-slate-600">遅延数</div>
              <div className="text-lg font-semibold">{statsQuery.data.lateCount}</div>
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            <div className="app-muted">success: {statsQuery.data.successCount}</div>
            <div className="app-muted">failure: {statsQuery.data.failureCount}</div>
            <div className="app-muted">onTime: {statsQuery.data.onTimeCount}</div>
          </div>
        </section>
      )}
    </main>
  );
}
