"use client";

import React, { useState } from "react";
import "../../styles/PerfilUsuario.css";

export default function PerfilUsuario() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Informações salvas com sucesso!");
    // Aqui você pode implementar a lógica para enviar as informações ao backend
  };

  return (
    <div className="perfil-container">
      <h1 className="perfil-titulo">Meu Perfil</h1>

      <div className="perfil-card">
        <div className="perfil-avatar">
          <img
            src="png-clipart-refilmery-computer-icons-avatar-user-profile-avatar-heroes-rim.png"
            alt="Avatar do Usuário"
          />
        </div>

        <form className="perfil-form" onSubmit={handleSubmit}>
          <label>Nome</label>
          <input
            type="text"
            placeholder="Seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Telefone</label>
          <input
            type="tel"
            placeholder="(11) 91234-5678"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
          />

          <label>Endereço</label>
          <textarea
            placeholder="Seu endereço"
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
