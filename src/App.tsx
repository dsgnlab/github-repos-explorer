import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";
import { Explorer } from "./components/Explorer";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Explorer />
    </QueryClientProvider>
  );
};

export default App;
