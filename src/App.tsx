import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <h1>Welcome to Stratego</h1>
      <Link to={'/rules'}>Play game</Link>
    </div>
  );
}

export default App;
