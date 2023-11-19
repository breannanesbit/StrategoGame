import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { GameRules } from './pages/GameRules';
import GameBoard from './pages/GameBorad';
import ErrorPage, { ErrorBoundary } from './component/error-page';
import { PlayGame } from './pages/PlayGame';
import NavBar from './component/navBar';
import keycloak from './component/keycloak';
import LeaderBoard from './pages/LeaderBoard';



keycloak
  .init({ onLoad: 'login-required' })
  .then((authenticated) => {
    console.log('Keycloak initialized');
  })
  .catch((error) => {
    console.error('Keycloak initialization error', error);
  });


const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
      <NavBar/>
      <ErrorBoundary fallback={<ErrorPage />}>
        <App />
      </ErrorBoundary>
      </>
    ),
  },
  {
    path: 'rules',
    element: (
      <>
      <NavBar/>
      <ErrorBoundary fallback={<ErrorPage />}>
        <GameRules />
      </ErrorBoundary>
      </>
    ),
  },
  {
    path: 'buildborad',
    element: (
      <>
      <NavBar/>
      <ErrorBoundary fallback={<ErrorPage />}>
        <GameBoard />
      </ErrorBoundary>
      </>
    ),
  },
  {
    path: 'playGame',
    element: (
      <>
      <NavBar/>
      <ErrorBoundary fallback={<ErrorPage />}>
        <PlayGame/>
      </ErrorBoundary>
      </>
    ),
  },
  {
    path: 'LeaderBoard',
    element: (
      <>
      <NavBar/>
      <ErrorBoundary fallback={<ErrorPage />}>
        <LeaderBoard />
      </ErrorBoundary>
      </>
    ),
  },
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ErrorBoundary fallback={<ErrorPage />}>
      <RouterProvider router={router} />
    </ErrorBoundary>
    {/* <App /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
