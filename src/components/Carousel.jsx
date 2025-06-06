"use client";

import React from 'react';
import '../styles/Carousel.css';


function Carousel({ images }) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="carousel">
      <button className="arrow left" onClick={prevSlide}>❮</button>
      <img src={images[currentIndex]} alt="Slide" className="carousel-image" />
      <button className="arrow right" onClick={nextSlide}>❯</button>
      <div className="indicators">
        {images.map((_, index) => (
          <span
            key={index}
            className={index === currentIndex ? 'dot active' : 'dot'}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
