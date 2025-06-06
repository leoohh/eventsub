"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import "../../../styles/ProdutoDetalhes.css";

// Produto simulado (trocar futuramente por chamada à API)
const produtoMock = {
  id: "1",
  nome: "Mesa de Madeira Rústica",
  preco: 299.9,
  descricao:
    "Mesa rústica ideal para eventos ao ar livre. Design elegante e robusto, perfeito para casamentos e festas.",
  imagens: [
    "/shopping.webp",
    "https://images.unsplash.com/photo-1616627981580-729d79991b1b",
    "https://images.unsplash.com/photo-1589923188900-63d32bd76acb"
  ],
  categoria: "Utensílios"
};

export default function ProdutoDetalhes() {
  const { id } = useParams();
  const produto = produtoMock;
  const [imagemPrincipal, setImagemPrincipal] = useState(produto.imagens[0]);

  return (
    <div className="produto-detalhes-container">
      <div className="imagem-lateral">
        <img src={imagemPrincipal} alt={produto.nome} className="imagem-principal" />
        <div className="miniaturas">
          {produto.imagens.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Imagem ${idx + 1}`}
              onClick={() => setImagemPrincipal(img)}
              className={img === imagemPrincipal ? "miniatura ativa" : "miniatura"}
            />
          ))}
        </div>
      </div>

      <div className="detalhes-produto">
        <h1 className="titulo-produto">{produto.nome}</h1>
        <p className="preco-produto">R$ {produto.preco.toFixed(2)}</p>
        <p className="descricao-produto">{produto.descricao}</p>
        <p className="categoria-produto">Categoria: {produto.categoria}</p>

        <button className="botao-comprar">Comprar</button>
      </div>
    </div>
  );
}
