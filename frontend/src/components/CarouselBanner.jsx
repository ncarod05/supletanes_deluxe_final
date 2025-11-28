// CarouselBanner.jsx
import React, { useState, useEffect, useRef } from 'react';
import SlideContent from './SlideContent';
// Asegúrate de que jQuery y Bootstrap JS están cargados globalmente si usas eventos

// ... (Definiciones de captionVariants y SlideContent) ...

function CarouselBanner() {
  // 1. Estado para rastrear qué slide está activo (0, 1, 2...)
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null); // Referencia al elemento del carrusel

  useEffect(() => {
    const carouselEl = carouselRef.current;

    if (!carouselEl) return;

    // Función para obtener el índice del slide activo
    const handleSlid = () => {
      // En un entorno de Bootstrap, el slide activo tiene la clase 'active'
      const activeItem = carouselEl.querySelector('.carousel-item.active');
      const items = Array.from(carouselEl.querySelectorAll('.carousel-item'));
      const newIndex = items.indexOf(activeItem);

      // Actualiza el estado de React con el nuevo índice
      setActiveIndex(newIndex);
    };

    // 2. Escuchar el evento 'slid.bs.carousel' de Bootstrap
    // Este evento se dispara DESPUÉS de que la transición del slide ha terminado.
    carouselEl.addEventListener('slid.bs.carousel', handleSlid);

    // Limpieza del listener
    return () => {
      carouselEl.removeEventListener('slid.bs.carousel', handleSlid);
    };
  }, []);

  // Array de datos del carrusel para mapear
  const slides = [
    { title: "¡Bienvenido a Supletanes Deluxe!", text: "Encuentra los mejores suplementos al mejor precio.", imgSrc: "/assets/img/suplementos-deportivos.webp", alt: "Promo 1" },
    { title: "🔥 Ofertas exclusivas 🔥", text: "Aprovecha descuentos especiales por tiempo limitado.", imgSrc: "/assets/img/Nutricion-deportiva.jpg", alt: "Promo 2" },
    { title: "Envíos a todo Chile", text: "Rápido, seguro y con garantía de calidad.", imgSrc: "/assets/img/suplementos_deportivos_1_9f22bd9520.png", alt: "Promo 3" },
  ];

  return (
    // 3. Agregar la referencia al div principal del carrusel
    <div id="carouselBanner" className="carousel slide carousel-banner" data-bs-ride="carousel" ref={carouselRef}>
      <div className="carousel-inner">

        {slides.map((slide, index) => (
          <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
            <img src={slide.imgSrc} className="d-block w-100" alt={slide.alt} />

            {/* 4. Pasar el estado 'isActive' al componente de contenido */}
            <SlideContent
              title={slide.title}
              text={slide.text}
              isActive={index === activeIndex}
            />
          </div>
        ))}
      </div>

      {/* Botones anterior / siguiente */}
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselBanner" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Anterior</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselBanner" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  );
}

export default CarouselBanner;