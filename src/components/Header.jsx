"use client";

import React, { useState } from 'react';
import '../styles/Header.css';
import Link from 'next/link';
import MenuLateral from './MenuLateral';
import { useAuth } from '@context/AuthContext';

function Header() {
  const { session } = useAuth()
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
        {session ?
          <> </> :
          <div className="account-buttons">
            <Link href="/login" className="account-button">Login</Link>
            <Link href="/cadastro" className="account-button">Cadastrar-se</Link>
          </div>
        }
        <div className="account-buttons">
          <button className="menu-icon" onClick={alternarMenu}>☰</button>
        </div>
      </header>

      {session ? <MenuLateral session={session} isOpen={menuAberto} /> : <> </>}
    </>
  );
}

export default Header;
