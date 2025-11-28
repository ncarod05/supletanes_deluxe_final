import React from 'react';
import { motion } from "motion/react"

function TopProducts() {
  return (
    <section className="top-products py-5">
      <div className="container">
        <h1 className="section-title mb-4 text-center">Productos De La Más Alta Calidad</h1>
        <div className="row g-4">
          {/* Producto 1 */}
          <div className="col-md-4">
            <motion.div
              className="product-card h-100"
              initial={{ scale: 1 }} // Estado inicial: sin escala
              whileHover={{ scale: 1.05, boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.2)" }}
              transition={{
                type: "spring",
                stiffness: 300, // Más rápido
                damping: 10      // Más rebote
              }}
              whileTap={{ scale: 0.95 }}
            >
              <img src="/assets/img/Gold Standard 5LB.webp" className="img-fluid mb-3" alt="Proteina En Polvo" />
              <h5 className="mb-2">Proteina En Polvo</h5>
              <p>Aporta proteínas de alta calidad de forma rápida y sencilla a nuestro organismo...</p>
              <button className="button button-lg w-100">Ver más</button>
            </motion.div>
          </div>

          {/* Producto 2 */}
          <div className="col-md-4">
            <motion.div
              className="product-card h-100"
              initial={{ scale: 1 }} // Estado inicial: sin escala
              whileHover={{ scale: 1.05, boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.2)" }}
              transition={{
                type: "spring",
                stiffness: 300, // Más rápido
                damping: 10      // Más rebote
              }}
              whileTap={{ scale: 0.95 }}
            >
              <img src="/assets/img/Platinum Creatine.jpg" className="img-fluid mb-3" alt="Creatina Monohidratada" />
              <h5 className="mb-2">Creatina Monohidratada</h5>
              <p>La creatina es uno de los suplementos más populares y con más evidencia científica...</p>
              <button className="button button-lg w-100">Ver más</button>
            </motion.div>
          </div>

          {/* Producto 3 */}
          <div className="col-md-4">
            <motion.div
              className="product-card h-100"
              initial={{ scale: 1 }} // Estado inicial: sin escala
              whileHover={{ scale: 1.05, boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.2)" }}
              transition={{
                type: "spring",
                stiffness: 300, // Más rápido
                damping: 10      // Más rebote
              }}
              whileTap={{ scale: 0.95 }}
            >
              <img src="/assets/img/Multivitaminico.jpg" className="img-fluid mb-3" alt="Multivitamínicos" />
              <h5 className="mb-2">Multivitamínicos</h5>
              <p>Los multivitamínicos sirven para suplementar la dieta y aportar las vitaminas y minerales necesarios...</p>
              <button className="button button-lg w-100">Ver más</button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TopProducts;