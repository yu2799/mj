import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { Home } from "./components/page/Home";
import MahjongScoreBoard from "./components/page/MahjongScoreBoard";
import ResultsList from "./components/page/ResultsList";
import Footer from "./components/page/Footer";
import { CssBaseline } from "@mui/material";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CssBaseline />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/input" element={<MahjongScoreBoard />} />
        <Route path="/results" element={<ResultsList />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>,
);
