export function StatsRangePicker(props: {
  from: string;
  to: string;
  onChange: (next: { from: string; to: string }) => void;
  onLast7Days: () => void;
}) {
  return (
    <section className="app-card">
      <div className="flex flex-wrap items-end gap-3">
        <div className="app-field grow">
          <label className="app-label">from</label>
          <input
            type="date"
            className="app-input"
            value={props.from}
            onChange={(e) => props.onChange({ from: e.target.value, to: props.to })}
          />
        </div>
        <div className="app-field grow">
          <label className="app-label">to</label>
          <input
            type="date"
            className="app-input"
            value={props.to}
            onChange={(e) => props.onChange({ from: props.from, to: e.target.value })}
          />
        </div>
        <button type="button" className="app-button-secondary" onClick={props.onLast7Days}>
          直近7日
        </button>
      </div>
    </section>
  );
}
