import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
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

// keycloak
//   .init({ onLoad: "login-required" })
//   .then((_authenticated) => {
//     console.log("Keycloak initialized");
//   })
//   .catch((error) => {
//     console.error("Keycloak initialization error", error);
//   });

  const oidcConfig = {
    authority: 'http://localhost:8080/Stratego',
    client_id: 'stratgeoClient',
    redirect_uri: 'http://localhost:3000/redirect-uri', 
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
]);

const queryClient = getQueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
  <AuthProvider
      authority={oidcConfig.authority}
      client_id={oidcConfig.client_id}
      redirect_uri={oidcConfig.redirect_uri}
    >
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary fallback={<ErrorPage />}>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </QueryClientProvider>

    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
