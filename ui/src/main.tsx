import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "@/components/layout/layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Note from "@/pages/note";
import NothingSelected from "@/pages/nothing-selected";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<NothingSelected />} />
            <Route path="/notes/:noteId" element={<Note />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
