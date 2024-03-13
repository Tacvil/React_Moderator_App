import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Annontiment from './Annontiment';
import { ItemProvider } from './ItemContext'; // Импортируем провайдер контекста

const App = () => (
  <ItemProvider>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/annontiment/:id" element={<Annontiment />} />
    </Routes>
  </ItemProvider>
);

export default App;
