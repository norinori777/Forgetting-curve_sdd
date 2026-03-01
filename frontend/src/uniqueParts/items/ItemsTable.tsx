import { isBefore, todayIsoDate, type ItemWithSchedule } from "@fc/shared";

export function ItemsTable(props: {
  items: ItemWithSchedule[];
  onDelete: (itemId: string) => void;
  deletingItemId?: string;
  deleteErrorItemId?: string;
}) {
  const today = todayIsoDate();

  return (
    <div className="app-table-wrap">
      <table className="app-table">
        <thead>
          <tr className="app-table-head-row">
            <th className="app-th">タイトル</th>
            <th className="app-th">次回予定日</th>
            <th className="app-th">stage</th>
            <th className="app-th">タグ</th>
            <th className="app-th">操作</th>
          </tr>
        </thead>
        <tbody>
          {props.items.map(({ item, schedule }) => {
            const overdue = isBefore(schedule.dueOn, today);
            const isDeleting = props.deletingItemId === item.id;
            const deleteFailed = props.deleteErrorItemId === item.id;
            return (
              <tr key={item.id} className="app-tr">
                <td className="app-td">
                  <div className="font-medium">{item.title}</div>
                  {overdue && (
                    <div className="text-sm app-overdue">期限切れ</div>
                  )}
                </td>
                <td className={overdue ? "app-td app-overdue" : "app-td"}>
                  {schedule.dueOn}
                </td>
                <td className="app-td">{schedule.stage}</td>
                <td className="app-td">
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((t) => (
                      <span key={t} className="app-badge">
                        {t}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="app-td">
                  <div className="grid gap-1 justify-items-start">
                    <button
                      type="button"
                      className="app-button-danger"
                      disabled={isDeleting}
                      onClick={() => props.onDelete(item.id)}
                    >
                      {isDeleting ? "削除中..." : "削除"}
                    </button>
                    {deleteFailed && (
                      <div className="app-error-text">削除に失敗しました。</div>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
