"use client";

import React, { useState } from "react";
import "@/styles/CadastroProduto.css";
import { app } from "@services/app.service";
import { showToast } from "@utils/notify.util";

interface Props {
  categorias?: { id_categoria: number; nome_categoria: string }[];
}

export default function CadastroProduto({ categorias = [] }: Props) {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("R$ 0,00");
  const [descricao, setDescricao] = useState("");
  const [imagens, setImagens] = useState<File[]>([]);
  const [preview, setPreview] = useState<string[]>([]);
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<number[]>([]);

  const handleImagemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImagens(files);
    const previews = files.map(file => URL.createObjectURL(file));
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

  const handleCategoriaChange = (id: number) => {
    setCategoriasSelecionadas(prev =>
      prev.includes(id) ? prev.filter(cat => cat !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const precoNumerico = Number(preco.replace(/\D/g, "")) / 100;
      const imagensBase64 = await Promise.all(imagens.map(converterParaBase64));

      await app({
        url: "api/produto/criar",
        method: "POST",
        data: {
          nome,
          preco: precoNumerico,
          descricao,
          imagens: imagensBase64,
          categorias: categoriasSelecionadas,
        },
      });

      showToast({ type: "success", message: "Produto Cadastrado com Sucesso!" });

      // resetar
      setNome("");
      setPreco("R$ 0,00");
      setDescricao("");
      setImagens([]);
      setPreview([]);
      setCategoriasSelecionadas([]);
    } catch (error) {
      console.error(error);
      showToast({ type: "error", message: "Erro ao cadastrar o produto." });
    }
  };

  return (
    <div className="cadastro-container">
      <h1 className="titulo">Cadastrar Produto</h1>
      <form className="cadastro-formulario" onSubmit={handleSubmit}>
        {/* Upload de Imagem */}
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

        {/* Campos de Entrada */}
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

          {/* Seleção de Categorias */}
          {categorias.length > 0 && (
            <div className="grupo">
              <label>Categorias</label>
              <div className="checkbox-lista">
                {categorias.map((cat) => (
                  <label key={cat.id_categoria} style={{ display: "block" }}>
                    <input
                      type="checkbox"
                      value={cat.id_categoria}
                      checked={categoriasSelecionadas.includes(cat.id_categoria)}
                      onChange={() => handleCategoriaChange(cat.id_categoria)}
                    />
                    {cat.nome_categoria}
                  </label>
                ))}
              </div>
            </div>
          )}

          <button type="submit" className="botao">
            Cadastrar Produto
          </button>
        </div>
      </form>
    </div>
  );
}
