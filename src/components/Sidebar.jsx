"use client";

import React from 'react';
import '../styles/Sidebar.css';

function Sidebar({ isOpen, toggleMenu }) {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={toggleMenu}>×</button>
      <ul>
        <li>Notificações</li>
        <li>Carteira</li>
        <li>Favoritos</li>
        <li>Compras</li>
        <li>Ajuda</li>
      </ul>
    </div>
  );
}

export default Sidebar;
