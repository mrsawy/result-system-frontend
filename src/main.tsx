import React from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
} from "react-router";

import router from "./Router.tsx";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import "./index.css";
import "./App.css";

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


const queryClient = new QueryClient()





ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
