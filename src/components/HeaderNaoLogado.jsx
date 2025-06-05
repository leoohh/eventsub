"use client";

import React, { useState } from 'react';
import '../styles/Header.css';
import { Link } from 'react-router-dom';
import MenuLateral from './MenuLateral';

function HeaderLogado({ nomeUsuario }) {
  const [menuAberto, setMenuAberto] = useState(false);

  const alternarMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <>
      <header className="header">
        <div className="logo-area">
          <img src="/estrela-na-pagina-do-calendario-diario.png" alt="Events Hub" className="logo-icon" />
          <span className="logo-text">Events Hub</span>
        </div>
        <div className="search-area">
          <input type="text" placeholder="Pesquisar..." className="search-input" />
          <button className="search-button">🔍</button>
        </div>
        <nav className="nav-links">
          <Link to="/">Início</Link>
          <Link to="/categoria">Categoria</Link>
          <Link to="/destaques">Destaques</Link>
        </nav>
        <div className="account-buttons">
          <button className="menu-icon" onClick={alternarMenu}>☰</button>
        </div>
      </header>

      <MenuLateral isOpen={menuAberto} />
    </>
  );
}

export default HeaderLogado;
