import React from 'react';
import { Container } from 'react-bootstrap';

function QuienesSomos() {
  return (
    <>
      <main className="container my-5">
        {/* Carrusel */}
        <div id="carouselExampleCaptions" className="carousel slide mb-5" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="/assets/img/Mappa.png" className="d-block w-100" alt="Suplemento 1" />
              <div className="carousel-caption d-none d-md-block">
                <h5>Donde puedes encontrarnos</h5>
                <p>Freire 867, 8071189 San Bernardo, Región Metropolitana</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="/assets/img/Stock.jpg" className="d-block w-100" alt="Suplemento 2" />
              <div className="carousel-caption d-none d-md-block">
                <h5>Nuestro Stock</h5>
                <p>¿Lo quieres? ¡Lo tenemos!</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="/assets/img/Tienda.jpg" className="d-block w-100" alt="Suplemento 3" />
              <div className="carousel-caption d-none d-md-block">
                <h5>Siempre disponibles</h5>
                <p>Ven a nuestra tienda física cuando quieras</p>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Anterior</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Siguiente</span>
          </button>
        </div>

        {/* Contenido */}
        <div className="text-center">
          <h1 className="mb-4">Sobre Supletanes Deluxe</h1>
          <hr className="my-4" />
          <p className="fs-5">
            Supletanes Deluxe es una tienda online dedicada a entregar suplementos deportivos de la más alta calidad,
            directamente a la puerta de nuestros clientes en Chile. Con más de 6 años de experiencia,
            operamos en más de 9 puntos del país, incluyendo ciudades clave como Santiago, Puerto Montt,
            Villarica, Nacimiento, Viña del Mar, Valparaíso y Concepción.
          </p>
          <p className="fs-5">
            Nuestra misión es conectar a los atletas y entusiastas del fitness con productos que
            realmente potencien su rendimiento, promoviendo un estilo de vida saludable, activo y sostenible.
          </p>
          <hr className="my-4" />
          <h2>Misión</h2>
          <p className="fs-5">
            Nuestra misión es proporcionar suplementos deportivos confiables y efectivos directamente a nuestros clientes,
            garantizando calidad en cada entrega. Nos comprometemos a fortalecer la relación entre consumidores y
            fabricantes responsables, apoyando prácticas sostenibles y fomentando la educación nutricional.
          </p>
          <hr className="my-4" />
          <h2>Visión</h2>
          <p className="fs-5">
            Nuestra visión es ser la tienda online líder en distribución de suplementos deportivos en Chile,
            reconocida por nuestra calidad, servicio y compromiso con la salud. Queremos expandirnos a nivel nacional
            e internacional, estableciendo un nuevo estándar en el mundo del fitness y la suplementación.
          </p>
          <hr className="my-4" />
        </div>
      </main>
    </>
  );
}

export default QuienesSomos;