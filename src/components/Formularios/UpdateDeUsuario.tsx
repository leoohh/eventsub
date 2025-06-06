"use client";

import React, { useState } from "react";
import "../../styles/PerfilUsuario.css";

interface PerfilUsuarioProps {
  perfil: {
    nome: string;
    email: string;
    telefone: string;
    endereco: string;
  };
}

export default function UpdateDeUsuario({ perfil }: PerfilUsuarioProps) {
  const [nome, setNome] = useState(perfil.nome || "");
  const [email, setEmail] = useState(perfil.email || "");
  const [telefone, setTelefone] = useState(perfil.telefone || "");
  const [endereco, setEndereco] = useState(perfil.endereco || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Informações salvas com sucesso!");
  };

  return (
    <div className="perfil-container">
      <h1 className="perfil-titulo">Meu Perfil</h1>

      <div className="perfil-card">
        <div className="perfil-avatar">
          <img src="avatar.png" alt="Avatar do Usuário" />
        </div>

        <form className="perfil-form" onSubmit={handleSubmit}>
          <label>Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Telefone</label>
          <input
            type="tel"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
          />

          <label>Endereço</label>
          <textarea
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            rows={3}
            required
          />

          <button type="submit" className="perfil-botao">
            Salvar Alterações
          </button>
        </form>
      </div>
    </div>
  );
}
