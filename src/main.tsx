import ReactDOM from "react-dom/client";
import "./index.css";
import { Toaster } from "./components/ui/toaster.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import React from "react";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
