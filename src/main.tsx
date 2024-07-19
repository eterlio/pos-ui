import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "sonner";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "./style/index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster expand={true} richColors closeButton theme="dark" visibleToasts={3} className="z-[9999]" />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </Router>
);
