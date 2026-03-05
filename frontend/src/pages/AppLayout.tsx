import { Outlet } from "react-router-dom";

import { AppHeader } from "../uiParts/AppHeader";

export function AppLayout() {
  return (
    <div>
      <AppHeader />
      <Outlet />
    </div>
  );
}
