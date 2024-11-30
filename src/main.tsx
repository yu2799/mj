import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import { BrowserRouter, Route, Routes } from "react-router";
import { CssBaseline } from "@mui/material";
import { PrivateRoute } from "./components/router/PrivateRoute";
import MahjongScoreBoard from "./components/page/MahjongScoreBoard";
import ResultsListPage from "./components/page/ResultsList";
import Login from "./components/page/Login";
import { PublicRoute } from "./components/router/PublicRoute";
import { RouteGuard } from "./components/router/RouteGard";

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
              <Route path="/results" element={<ResultsListPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  </StrictMode>,
);
