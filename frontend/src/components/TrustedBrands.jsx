import React from 'react';
import { motion } from "motion/react"
import '../assets/css/TrustedBands.css'

const brandLogos = [
  { src: "/assets/img/optimum-nutrition-logo-0.png", alt: "Optimum Nutrition" },
  { src: "/assets/img/ultimate-nutritionlogo0693.png", alt: "Ultimate Nutrition" },
  { src: "/assets/img/Muscletech.png", alt: "Muscletech" },
  { src: "/assets/img/dymatize-4096.png", alt: "Dymatize" },
  { src: "/assets/img/Nutrex_logo.webp", alt: "Nutrex" }
];

// Duplicamos el array para el efecto de bucle infinito
const allBrands = [...brandLogos, ...brandLogos, ...brandLogos];

const itemWidth = 250;
const trackWidth = allBrands.length * itemWidth; // Ancho total del track (2000px si son 8 items)
const animationDistance = brandLogos.length * itemWidth;

function TrustedBrands() {
  return (
    <section className="trusted-brands py-5 bg-light">
      <div className="text-center">
        <h1 className="section-title mb-4">Marcas Reconocidas y Garantía</h1>

        {/* 1. Nuevo Contenedor de Máscara (Full-Width) */}
        <div className="fade-mask-container">

          {/* 2. Máscara Izquierda */}
          <div className="fade-mask left"></div>

          {/* 3. Máscara Derecha */}
          <div className="fade-mask right"></div>

          {/* 4. Contenedor de la Animación (Track Wrapper) */}
          <div className="logos-track-wrapper mb-5">

            {/* 2. TRACK que se va a mover (motion.div) */}
            <motion.div
              className="logos-track"
              style={{ width: trackWidth }} // Ajustamos el ancho total calculado

              // 3. Animación de movimiento infinito
              animate={{
                x: [0, -animationDistance], // Mover de la posición 0 a -1000px
              }}
              transition={{
                x: {
                  // Configuración clave: Repetir infinitamente
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20, // Duración del ciclo completo (más segundos = más lento)
                  ease: "linear", // Debe ser lineal para que no se note la pausa
                },
              }}
            >
              {/* Mapeamos el array duplicado */}
              {allBrands.map((brand, index) => (
                <div
                  key={brand.id + index} // Usar índice + ID para clave única al duplicar
                  className="logo-item"
                  style={{ width: itemWidth }} // Fija el ancho del item
                >
                  <img src={brand.src} className="img-fluid" alt={brand.alt} />
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Sellos de confianza */}
        <div className="d-flex flex-wrap justify-content-center gap-4">
          <div className="badge bg-success p-3 rounded-3 shadow-sm">
            <i className="bi bi-check-circle me-2"></i> 100% Productos Originales
          </div>
          <div className="badge bg-primary p-3 rounded-3 shadow-sm">
            <i className="bi bi-truck me-2"></i> Envíos a Todo Chile
          </div>
          <div className="badge bg-warning text-dark p-3 rounded-3 shadow-sm">
            <i className="bi bi-shield-lock me-2"></i> Compra Segura Garantizada
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrustedBrands;