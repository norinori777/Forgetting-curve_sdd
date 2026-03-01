import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "./hooks/queryClient";
import { AppRoutes } from "./pages/routes.tsx";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
    </QueryClientProvider>
  );
}
