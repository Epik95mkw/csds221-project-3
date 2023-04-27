import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import './style.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Components/layout';
import GameList from './Components/gameList';
import RecordList from './Components/recordList';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<GameList />} />
            <Route 
              path="game/:gameId" 
              element={<RecordList />} />
            <Route path="*" element={<div>404 Page Not Found</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}


