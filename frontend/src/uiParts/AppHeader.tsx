import { NavLink } from "react-router-dom";

const APP_NAME = "Forgetting-curve";

type MenuItem = {
  label: string;
  to: string;
};

const MENU_ITEMS: MenuItem[] = [
  { label: "復習", to: "/review" },
  { label: "集計", to: "/stats" },
  { label: "設定（プリセット）", to: "/presets" },
];

export function AppHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 p-4 sm:flex-row sm:items-center sm:gap-4 sm:p-6">
        <div className="flex min-w-0 items-center gap-2" aria-label="App">
          <div
            className="grid h-8 w-8 place-items-center rounded-md border border-slate-300 bg-slate-50 text-xs font-semibold text-slate-700"
            aria-hidden
          >
            FC
          </div>
          <div className="min-w-0 truncate text-sm font-semibold text-slate-900">
            {APP_NAME}
          </div>
        </div>

        <nav className="w-full sm:flex-1" aria-label="Primary">
          <div className="flex justify-evenly gap-2">
            {MENU_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  isActive
                    ? "app-button-primary w-auto"
                    : "app-button-secondary w-auto"
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
