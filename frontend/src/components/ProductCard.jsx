import React from 'react';
import { Button } from 'react-bootstrap';
import { motion } from 'framer-motion';

function ProductCard({ name, brand, description, price, oldPrice, image, link, onAdd }) {
  return (
    <motion.div
      className="card h-100 product-card position-relative"
      // 3. Propiedades de Framer Motion para el Hover
      initial={{ scale: 1, rotate: 0 }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)"
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 10
      }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="promo promo-sticker">¡Oferta!</span>
      <a href={link}>
        <img src={image} className="card-img-top" alt={name} />
      </a>
      <div className="card-body d-flex flex-column">
        <p className="card-text text-uppercase text-muted mb-1 brand-text">{brand}</p>
        <h5 className="card-title">
          <a href={link} className="card-link">{name}</a>
        </h5>
        <p className="card-text flex-grow-1">{description}</p>
        <p className="card-price-highlight">
          <span className="me-2">{price}</span>
          <span className="old-price">{oldPrice}</span>
        </p>
        <Button variant="success" className="mt-auto p-2" onClick={onAdd}>
          <i className="bi bi-cart-plus me-1"></i> Agregar al carrito
        </Button>
      </div>
    </motion.div>
  );
}

export default ProductCard;