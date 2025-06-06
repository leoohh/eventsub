// app/produto/[id]/ProdutoDetalhesClient.tsx
"use client";

import { useState } from "react";

export default function ProdutoSection({ produto }) {
  const [imagemPrincipal, setImagemPrincipal] = useState(produto.imagens?.[0] || "");

  const nomesCategorias = produto.categorias
    ?.map((cat) => cat.nome_categoria)
    .join(", ");

  return (
    <div className="produto-detalhes-container">
      <div className="imagem-lateral">
        <img
          src={imagemPrincipal}
          alt={produto.nome}
          className="imagem-principal"
        />
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
        <p className="preco-produto">R$ {Number(produto.preco).toFixed(2)}</p>
        <p className="descricao-produto">{produto.descricao}</p>
        <p className="categoria-produto">Categoria: {nomesCategorias}</p>

        <button className="botao-comprar">Comprar</button>
      </div>
    </div>
  );
}
