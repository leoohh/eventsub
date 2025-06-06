"use client";

// src/components/MenuLateral.jsx
import React from 'react';
import '../styles/MenuLateral.css';
import { useRouter } from 'next/navigation';
import { app } from '@services/app.service';

const MenuLateral = ({ session, isOpen }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await app({url: '/api/auth/logout'})

      window.location.reload();
    } catch (err) {
      console.error('Erro na requisição de logout:', err);
    }
  };

  return (
<div className={`menu-lateral ${isOpen ? 'open' : ''}`}>
  <div className="menu-header">
    <div className="perfil-avatar-menu">
      <img
        src={session?.imagem || "/avatar.png"}
        alt="Avatar do Usuário"
      />
    </div>
    <div className="user-info">
      <span className="user-name">{session?.nome || 'Usuário'}</span>
    </div>
  </div>

  <button className="menu-item">Minha Conta</button>
  <button className="menu-item">Favoritos</button>
  <button className="menu-item">Ajuda</button>
  <button className="menu-item">Torne-se parceiro</button>
  <button className="menu-item" onClick={handleLogout}>Sair</button>
</div>

  );
};

export default MenuLateral;
