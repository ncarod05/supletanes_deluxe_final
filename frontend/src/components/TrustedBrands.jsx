import React from 'react';

function TrustedBrands() {
  return (
    <section className="trusted-brands py-5 bg-light">
      <div className="container text-center">
        <h2 className="section-title mb-4">Marcas Reconocidas & Garantía</h2>

        {/* Logos de marcas */}
        <div className="row g-4 mb-5">
          <div className="col-6 col-md-3 d-flex align-items-center justify-content-center">
            <img src="/assets/img/optimum-nutrition-logo-0.png" className="img-fluid" alt="Optimum Nutrition" />
          </div>
          <div className="col-6 col-md-3 d-flex align-items-center justify-content-center">
            <img src="/assets/img/ultimate-nutritionlogo0693.png" className="img-fluid" alt="Ultimate Nutrition" />
          </div>
          <div className="col-6 col-md-3 d-flex align-items-center justify-content-center">
            <img src="/assets/img/Muscletech.png" className="img-fluid" alt="Muscletech" />
          </div>
          <div className="col-6 col-md-3 d-flex align-items-center justify-content-center">
            <img src="/assets/img/dymatize-4096.png" className="img-fluid" alt="Dymatize" />
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