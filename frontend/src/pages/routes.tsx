import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { ItemsPage } from "./ItemsPage";
import { PresetsPage } from "./PresetsPage";
import { ReviewPage } from "./ReviewPage";
import { StatsPage } from "./StatsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ItemsPage />,
  },
  {
    path: "/review",
    element: <ReviewPage />,
  },
  {
    path: "/presets",
    element: <PresetsPage />,
  },
  {
    path: "/stats",
    element: <StatsPage />,
  },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
