import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import { CssBaseline } from "@mui/material";
import { PrivateRoute } from "./components/router/PrivateRoute";
import MahjongScoreBoard from "./components/page/MahjongScoreBoard";
import ResultsList from "./components/page/ResultsList";
import ResultDetail from "./components/page/ResultDetail";
import Login from "./components/page/Login";
import { PublicRoute } from "./components/router/PublicRoute";
import { RouteGuard } from "./components/router/RouteGard";
import { Ranking } from "./components/page/Ranking";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CssBaseline />
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route element={<RouteGuard />}>
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/input" element={<MahjongScoreBoard />} />
              <Route path="/results" element={<ResultsList />} />
              <Route path="/results/:id" element={<ResultDetail />} />
              <Route path="ranking" element={<Ranking />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  </StrictMode>,
);
