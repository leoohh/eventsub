"use client";

import '../../styles/Auth.css';

import { useState } from "react";
import { showToast } from "@utils/notify.util";
import { app } from "@services/app.service";
import { useRouter } from "next/navigation";

export default function CadastroPage() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome || !email || !telefone || !senha || !confirmarSenha) {
      showToast({ type: "error", message: "Preencha todos os campos." });
      return;
    }

    if (senha !== confirmarSenha) {
      showToast({ type: "error", message: "As senhas não coincidem." });
      return;
    }

    try {
      await app({
        url: "api/usuario/cadastro",
        data: { nome, email, telefone, senha }
      });

      showToast({ type: "success", message: "Cadastro realizado com sucesso!" });
      router.push("/login");
    } catch (err) {
      console.error(err);
      showToast({ type: "error", message: "Erro ao cadastrar. Verifique os dados." });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Criar uma conta</h2>
        <p className="auth-subtitle">Preencha os dados abaixo</p>
        <form className="auth-form" onSubmit={onSubmit}>
          <div className="input-group">
            <label>Nome</label>
            <input
              type="text"
              placeholder="Digite seu nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Telefone</label>
            <input
              type="tel"
              placeholder="(99) 99999-9999"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Senha</label>
            <input
              type="password"
              placeholder="Crie uma senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Confirmar senha</label>
            <input
              type="password"
              placeholder="Confirme a senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="auth-button">Cadastrar</button>
        </form>
        <p className="auth-switch">Já tem uma conta? <a href="/login">Entrar</a></p>
      </div>
    </div>
  );
}
