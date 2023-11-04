import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <div>
      <h1>Welcome to Stratego</h1>
      <Link to={'/rules'}>Play game</Link>
      <HomePage/>
    </div>
  );
}

export default App;
