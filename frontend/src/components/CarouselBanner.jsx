import React from 'react';

function CarouselBanner() {
  return (
    <div id="carouselBanner" className="carousel slide carousel-banner" data-bs-ride="carousel">
      <div className="carousel-inner">
        {/* Imagen 1 */}
        <div className="carousel-item active">
          <img src="/assets/img/suplementos-deportivos.webp" className="d-block w-100" alt="Promo 1" />
          <div className="carousel-caption d-none d-md-block">
            <h5>¡Bienvenido a Supletanes Deluxe!</h5>
            <p>Encuentra los mejores suplementos al mejor precio.</p>
          </div>
        </div>

        {/* Imagen 2 */}
        <div className="carousel-item">
          <img src="/assets/img/Nutricion-deportiva.jpg" className="d-block w-100" alt="Promo 2" />
          <div className="carousel-caption d-none d-md-block">
            <h5>🔥 Ofertas exclusivas 🔥</h5>
            <p>Aprovecha descuentos especiales por tiempo limitado.</p>
          </div>
        </div>

        {/* Imagen 3 */}
        <div className="carousel-item">
          <img src="/assets/img/suplementos_deportivos_1_9f22bd9520.png" className="d-block w-100" alt="Promo 3" />
          <div className="carousel-caption d-none d-md-block">
            <h5>Envíos a todo Chile</h5>
            <p>Rápido, seguro y con garantía de calidad.</p>
          </div>
        </div>
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
