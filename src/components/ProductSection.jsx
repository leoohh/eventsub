"use client";

import React, { useRef } from 'react';
import '../styles/ProductSection.css';

const products = [
  { id: 1, image: '/images/prod1.jpg', name: 'Espaço A', rating: 4.5 },
  { id: 2, image: '/images/prod2.jpg', name: 'Espaço B', rating: 4.0 },
  { id: 3, image: '/images/prod3.jpg', name: 'Espaço C', rating: 5.0 },
  { id: 4, image: '/images/prod4.jpg', name: 'Espaço D', rating: 4.2 },
  { id: 5, image: '/images/prod5.jpg', name: 'Espaço E', rating: 4.8 },
  { id: 6, image: '/images/prod6.jpg', name: 'Espaço F', rating: 4.8 },
  { id: 7, image: '/images/prod7.jpg', name: 'Espaço G', rating: 4.8 },
  // Adicione mais produtos se quiser
];

function ProductSection({ title }) {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollLeft -= 300;
  };

  const scrollRight = () => {
    scrollRef.current.scrollLeft += 300;
  };

  return (
    <div className="product-section">
      <h2 className="section-title">{title}</h2>
      <div className="product-carousel-container">
        <button className="arrow-btn left" onClick={scrollLeft}>❮</button>
        <div className="product-carousel" ref={scrollRef}>
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />
              <h4>{product.name}</h4>
              <p>{'⭐'.repeat(Math.floor(product.rating))}</p>
            </div>
          ))}
        </div>
        <button className="arrow-btn right" onClick={scrollRight}>❯</button>
      </div>
    </div>
  );
}

export default ProductSection;
