// src/pages/HomeLogada.jsx
"use client";
import React, { useState } from 'react';
import Header from '@components/HeaderNaoLogado'; // importa o Header
import MenuLateral from '@components/MenuLateral'; // importa o MenuLateral

function HomeLogada() {
  return (
    <div>
      {/* Passa o toggleMenu para o Header */}
      <Header nomeUsuario="Leonardo" />
      
      {/* Menu lateral, visível apenas quando isMenuOpen for true */}
      <MenuLateral isOpen={true} />
      
      {/* Conteúdo da página logada */}
      <div style={{ marginTop: '100px' }}>
        <h1>Bem-vindo, Leonardo!</h1>
        {/* Aqui podem vir o carrossel e os cards igual à Home normal */}
      </div>
    </div>
  );
}

export default HomeLogada;
