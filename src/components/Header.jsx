// HeaderNaoLogado.jsx
"use client";

import React from 'react';
import Link from 'next/link';
import '../styles/Header.css';

function HeaderNaoLogado() {
  return (
    <header className="header">
      <div className="logo-area">
        <img src="/estrela-na-pagina-do-calendario-diario.png" alt="Events Hub" className="logo-icon" />
        <span className="logo-text">Events Hub</span>
      </div>
      <div className="search-area">
        <input type="text" placeholder="Pesquisar..." className="search-input" />
        <button className="search-button">🔍</button>
      </div>
      <div className="account-buttons">
        <Link href="/login" className="account-button">Login</Link>
        <Link href="/cadastro" className="account-button">Cadastrar-se</Link>
      </div>
    </header>
  );
}

export default HeaderNaoLogado;
