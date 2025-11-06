import React from 'react';

function Footer() {
  return (
    <footer className="custom-footer text-white mt-5 pt-4 pb-4">
      <div className="container">
        <div className="row">
          {/* Columna 1: Marca */}
          <div className="col-md-4 mb-4 mb-md-0">
            <h4 className="footer-title">Supletanes Deluxe</h4>
            <p>Suplementos de calidad premium</p>
          </div>

          {/* Columna 2: Enlaces */}
          <div className="col-md-4 mb-4 mb-md-0">
            <h5>Enlaces rápidos</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="footer-link">Inicio</a></li>
              <li><a href="/productos" className="footer-link">Productos</a></li>
              <li><a href="/quienes" className="footer-link">Quienes Somos</a></li>
              <li><a href="/carrito" className="footer-link">Carrito</a></li>
              <li><a href="/usuario" className="footer-link">Mi Perfil</a></li>
              <li><a href="/nuevousuario" className="footer-link">Crear Cuenta</a></li>
            </ul>
          </div>

          {/* Columna 3: Contacto */}
          <div className="col-md-4">
            <h5>Contáctanos</h5>
            <ul className="list-unstyled">
              <li><i className="bi bi-envelope-fill me-2"></i> contacto@supletanesdeluxe.com</li>
              <li><i className="bi bi-phone-fill me-2"></i> +56 9 0000 9999</li>
              <li><i className="bi bi-geo-alt-fill me-2"></i> San Bernardo, Región Metropolitana, Chile</li>
            </ul>
          </div>
        </div>

        <hr className="my-4" style={{ borderColor: '#FFD166' }} />
        <div className="text-center small">
          © 2025 Supletanes Deluxe. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}

export default Footer;