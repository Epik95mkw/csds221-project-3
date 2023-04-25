import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import './style.css';
import NavBar from './Components/navbar';
import GameList from './Components/gameList';

export default function App() {
  return (
    <div className="App">
      <NavBar />

      <GameList />
    </div>
  );
}


