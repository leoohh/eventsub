"use client";

import '../../styles/Auth.css';

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { showToast } from "@utils/notify.util";
import { app } from '@services/app.service';

export default function LoginPage() {
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  useEffect(() => {
    const sessionExpired = searchParams.get("sessionExpired");

    if (sessionExpired === "1") {
      showToast({ type: "info", message: "Sua sessão chegou ao fim... Faça login novamente para continuar." });
    }
  }, [searchParams]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !senha) {
      showToast({ type: "error", message: "Preencha todos os campos." });
      return;
    }

    try {
      await app({ url: "api/auth/login", data: { email, senha } })

      window.location.reload();
    } catch (err) {
      console.log(err)
      showToast({ type: "error", message: "Erro ao fazer login." });
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Bem-vindo de volta 👋</h2>
        <p className="auth-subtitle">Faça login para continuar</p>
        <form className="auth-form" onSubmit={onSubmit}>
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
            <label>Senha</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="auth-button">Entrar</button>
        </form>
        <p className="auth-switch">Não tem conta? <a href="/Cadastro">Crie uma</a></p>
      </div>
    </div>
  );
}
