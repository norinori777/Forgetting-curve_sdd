import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { ItemsPage } from "./ItemsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ItemsPage />,
  },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
