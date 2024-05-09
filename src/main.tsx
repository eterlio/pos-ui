import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter as Router } from "react-router-dom";
import { StoreProvider } from "./utils/store.tsx"
import { Toaster } from 'sonner';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "./style/index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router>
    <QueryClientProvider client={queryClient}>
    <StoreProvider>
        <App />
      <Toaster expand={true} richColors />
    </StoreProvider>
    </QueryClientProvider>
  </Router>
)
