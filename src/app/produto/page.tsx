"use client";

import React, { useState } from "react";
import "../../styles/CadastroProduto.css";

export default function CadastroProduto() {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("R$ 0,00");
  const [descricao, setDescricao] = useState("");
  const [imagens, setImagens] = useState<File[]>([]);
  const [preview, setPreview] = useState<string[]>([]);

  const handleImagemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImagens(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreview(previews);
  };

  const formatarMoeda = (valor: string) => {
    const numeros = valor.replace(/\D/g, "");
    const numero = Number(numeros) / 100;
    return numero.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handlePrecoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorFormatado = formatarMoeda(e.target.value);
    setPreco(valorFormatado);
  };

  const converterParaBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const precoNumerico = Number(preco.replace(/\D/g, "")) / 100;

    // Converter imagens para base64
    const imagensBase64 = await Promise.all(imagens.map(converterParaBase64));

    console.log({
      nome,
      preco: precoNumerico,
      descricao,
      imagens: imagensBase64, // Aqui vão as imagens como base64
    });

    // Aqui você pode enviar para a API:
    /*
    await fetch("/api/produtos", {
      method: "POST",
      body: JSON.stringify({
        nome,
        preco: precoNumerico,
        descricao,
        imagens: imagensBase64,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    */
  };

  return (
    <div className="cadastro-container">
      <h1 className="titulo">Cadastrar Produto</h1>
      <form className="cadastro-formulario" onSubmit={handleSubmit}>
        <div className="imagem-box">
          <label className="imagem-label">
            Clique para adicionar imagens
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImagemChange}
            />
          </label>
          <div className="preview-imagens">
            {preview.map((src, index) => (
              <img key={index} src={src} alt={`Imagem ${index + 1}`} />
            ))}
          </div>
        </div>

        <div className="form-box">
          <div className="grupo">
            <label>Nome do Produto</label>
            <input
              type="text"
              placeholder="Digite o nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div className="grupo">
            <label>Preço</label>
            <input
              type="text"
              placeholder="R$ 0,00"
              value={preco}
              onChange={handlePrecoChange}
              required
            />
          </div>

          <div className="grupo">
            <label>Descrição</label>
            <textarea
              placeholder="Descreva o produto..."
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              rows={4}
              required
            />
          </div>

          <button type="submit" className="botao">
            Cadastrar Produto
          </button>
        </div>
      </form>
    </div>
  );
}
