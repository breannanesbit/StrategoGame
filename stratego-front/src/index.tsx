import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {Acheivement} from "./pages/Acheivements";
import { AdminAcheivements } from "./pages/AdminAcheivements";
import { GameRules } from "./pages/GameRules";
import GameBoard from "./pages/GameBorad";
import ErrorPage, { ErrorBoundary } from "./component/error-page";
import { PlayGame } from "./pages/PlayGame";
import NavBar from "./component/navBar";
import LeaderBoard from "./pages/LeaderBoard";
import { Toaster } from "react-hot-toast";
import { GameOver } from "./pages/GameOver";
import Settings from "./pages/Settings";
import { getQueryClient } from "./query/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { SeeDefaultBoard } from "./pages/SeeDefaultBoard";
import { NewDefaultBoard } from "./pages/NewDefaultborads";
import { AuthProvider } from "react-oidc-context";


const oidcConfig = {
  authority: 'https://stratego2023.duckdns.org:2004/realms/Stratego',
  client_id: 'stratgeoClient',
  redirect_uri: 'https://stratego2023.duckdns.org:2002',
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <NavBar />
        <ErrorBoundary fallback={<ErrorPage />}>
          <Toaster />
          <App />
        </ErrorBoundary>
      </>
    ),
  },
  {
    path: "rules",
    element: (
      <>
        <NavBar />
        <ErrorBoundary fallback={<ErrorPage />}>
          <Toaster />
          <GameRules />
        </ErrorBoundary>
      </>
    ),
  },
  {
    path: "buildborad",
    element: (
      <>
        <NavBar />
        <ErrorBoundary fallback={<ErrorPage />}>
          <Toaster />
          <GameBoard />
        </ErrorBoundary>
      </>
    ),
  },
  {
    path: "playGame",
    element: (
      <>
        <NavBar />
        <ErrorBoundary fallback={<ErrorPage />}>
          <Toaster />
          <PlayGame />
        </ErrorBoundary>
      </>
    ),
  },
  {
    path: "LeaderBoard",
    element: (
      <>
        <NavBar />
        <ErrorBoundary fallback={<ErrorPage />}>
          <Toaster />
          <LeaderBoard />
        </ErrorBoundary>
      </>
    ),
  },
  {
    path: "GameOver",
    element: (
      <>
        <NavBar />
        <ErrorBoundary fallback={<ErrorPage />}>
          <Toaster />
          <GameOver />
        </ErrorBoundary>
      </>
    ),
  },
  {
    path: "settings",
    element: (
      <>
        <NavBar />
        <ErrorBoundary fallback={<ErrorPage />}>
          <Toaster />
          <Settings/>
        </ErrorBoundary>
      </>
    ),
  },
  {
    path: "seeboards",
    element: (
      <>
        <NavBar />
        <ErrorBoundary fallback={<ErrorPage />}>
          <Toaster />
          <SeeDefaultBoard/>
        </ErrorBoundary>
      </>
    ),
  },
  {
    path: "newDefaultBoard",
    element: (
      <>
        <NavBar />
        <ErrorBoundary fallback={<ErrorPage />}>
          <Toaster />
          <NewDefaultBoard/>
        </ErrorBoundary>
      </>
    ),
  },
  {
    path: "acheivements",
    element: (
      <>
        <NavBar />
        <ErrorBoundary fallback={<ErrorPage />}>
          <Toaster />
          <Acheivement/>
        </ErrorBoundary>
      </>
    ),
  },
  {
    path: "adminAchievements",
    element: (
      <>
        <NavBar />
        <ErrorBoundary fallback={<ErrorPage />}>
          <Toaster />
          <AdminAcheivements/>
        </ErrorBoundary>
      </>
    ),
  },
]);

const queryClient = getQueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
  <AuthProvider {...oidcConfig}>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary fallback={<ErrorPage />}>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </QueryClientProvider>

    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
