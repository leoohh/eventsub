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
    <div style={{ marginBottom: 75 }}>
      <header className="header" >
        <Link href="/" className="logo-area">
          <img src="/logo.png" alt="Events Hub" className="logo-icon" />
          <span className="logo-text">Events Hub</span>
        </Link>
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
        {!session ?
          <> </> :
          <div className="account-buttons">
            <button className="menu-icon" onClick={alternarMenu}>☰</button>
          </div>
        }
      </header>

      {session ? <MenuLateral session={session} isOpen={menuAberto} /> : <> </>}
    </div>
  );
}

export default Header;
