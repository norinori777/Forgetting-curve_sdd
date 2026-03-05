import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { AppLayout } from "./AppLayout";
import { ItemsPage } from "./ItemsPage";
import { PresetsPage } from "./PresetsPage";
import { ReviewPage } from "./ReviewPage";
import { StatsPage } from "./StatsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <ItemsPage />,
      },
      {
        path: "review",
        element: <ReviewPage />,
      },
      {
        path: "stats",
        element: <StatsPage />,
      },
      {
        path: "presets",
        element: <PresetsPage />,
      },
    ],
  },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
