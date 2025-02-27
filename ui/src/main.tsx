import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Test from "./test";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Test />}>
          <Route index element={<div>hello!!</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
