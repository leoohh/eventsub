"use client";

import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../styles/ProductSection.css";

function ProductSection({ title, products }) {
  const scrollRef = useRef(null);
  const [showArrows, setShowArrows] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkOverflow = () => {
      const el = scrollRef.current;
      if (el) {
        setShowArrows(el.scrollWidth > el.clientWidth);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, [products]);

  const scrollLeft = () => {
    scrollRef.current.scrollLeft -= 300;
  };

  const scrollRight = () => {
    scrollRef.current.scrollLeft += 300;
  };

  const handleClick = (id) => {
    router.push(`/produto/${id}`);
  };

  return (
    <div className="product-section">
      <h2 className="section-title">{title}</h2>
      <div className="product-carousel-container">
        {showArrows && (
          <button className="arrow-btn left" onClick={scrollLeft}>
            ❮
          </button>
        )}
        <div className="product-carousel" ref={scrollRef}>
          {products.map((product) => {
            const id = product.id_produto || product.id;
            const nome = product.nome || product.name;
            const imagem = product.imagens?.[0] || product.image;

            return (
              <div
                className="product-card"
                key={id}
                onClick={() => handleClick(id)}
                style={{ cursor: "pointer" }}
              >
                <img src={imagem} alt={nome} />
                <h4>{nome}</h4>
                <p>{"⭐".repeat(Math.floor(product.rating || 0))}</p>
              </div>
            );
          })}
        </div>
        {showArrows && (
          <button className="arrow-btn right" onClick={scrollRight}>
            ❯
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductSection;
