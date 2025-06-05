"use client";
import React from 'react';
import Header from '../components/Header';
import Carousel from '../components/Carousel';
import ProductSection from '../components/ProductSection';
import Footer from '../components/Footer';

function Home() {
  return (
    <div>
      <Header />
      <Carousel />
      <ProductSection title="Categorias" />
      <ProductSection title="Vestuário" />
      <ProductSection title="Buffets" />
      <ProductSection title="Equipamentos" />
      <Footer/>
    </div>
  );
}
// Qualquer coisa
export default Home;
