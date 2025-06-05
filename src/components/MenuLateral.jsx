"use client";

// src/components/MenuLateral.jsx
import React from 'react';
import '../styles/MenuLateral.css';

const MenuLateral = ({ isOpen }) => {
  return (
    <div className={`menu-lateral ${isOpen ? 'open' : ''}`}>
      <div className="menu-header">
        <img src="/usuario-icon.png" alt="Usuário" />
        <div className="user-info">
          <span className="user-name">Nome do Usuário</span>
          <span className="user-account">minha conta</span>
        </div>
      </div>
      <button className="menu-item">Configurações</button>
      <button className="menu-item">Favoritos</button>
      <button className="menu-item">Ajuda</button>
      <button className="menu-item">Torne-se parceiro</button>
      <button className="menu-item">Sair</button> {/* Novo botão de sair */}
    </div>
  );
};

export default MenuLateral;
