"use client";

import React, { useRef } from 'react';
import '../styles/ProductSection.css';

function ProductSection({ title, products }) {
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
