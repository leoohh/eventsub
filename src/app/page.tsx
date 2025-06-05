import React from 'react';
import Carousel from '../components/Carousel';
import ProductSection from '../components/ProductSection';
import Footer from '../components/Footer';
import { app } from '@services/app.service';

export default async function CategoriasPage() {
  const res = await app({ url: "api/categoria/listar-categorias-e-produtos", method: "GET" });

  const data = await res.data.categorias;

  const categorias = data.map((categoria: any) => ({
    ...categoria,
    produtos: categoria.produtos.map((produto: any) => ({
      id: produto.id_produto,
      name: produto.nome,
      image: produto.imagens?.[0] || '/placeholder.jpg',
      rating: 4,
    })),
  }));

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Carousel />
      {categorias.map((categoria: any) => (
        <ProductSection
          key={categoria.id_categoria}
          title={categoria.nome_categoria}
          products={categoria.produtos}
        />
      ))}
      <Footer />
    </div>
  );
}
