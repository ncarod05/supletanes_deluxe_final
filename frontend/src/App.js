import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Carrito from "./components/carrito";
import HomePage from "./components/HomePage";
import Usuario from "./components/usuario";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Pedidos from "./components/pedidos";
import AdminDashboard from "./components/AdminDashboard";
import AdminProductos from "./components/AdminProductos";
import AdminPedidos from "./components/AdminPedidos"
import AdminUsuarios from "./components/AdminUsuarios";
import AdminReportes from "./components/AdminReportes";
import QuienesSomos from "./components/QuienesSomos";
import Productos from "./components/Productos";
import ProductoIndividual from './components/ProductoIndividual';
import ProductoIndividual2 from './components/ProductoIndividual2';
import ProductoIndividual3 from './components/ProductoIndividual3';
import ProductoIndividual4 from './components/ProductoIndividual4';
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import Resenas from "./components/resena";
import Layout from './components/Layout';

function App() {
  const [cart, setCart] = useState(() => {
    const guardado = localStorage.getItem("carrito");
    return guardado ? JSON.parse(guardado) : [];
  });
  
  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const guardado = localStorage.getItem("carrito");
    if (guardado) {
      setCart(JSON.parse(guardado));
    }
  }, []);

  // Guardar carrito cada vez que cambie
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(cart));
  }, [cart]);

  return (
    <Routes>
        {/* Rutas con layout */}
        <Route element={<Layout cartCount={cart.length} />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/carrito" element={<Carrito cart={cart} setCart={setCart} />} />
          <Route path="/usuario" element={<Usuario />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/productos" element={<AdminProductos />} />
          <Route path="/admin/pedidos" element={<AdminPedidos />} />
          <Route path="/admin/usuarios" element={<AdminUsuarios />} />
          <Route path="/admin/reportes" element={<AdminReportes />} />
          <Route path="/quienes" element={<QuienesSomos />} />
          <Route path="/productos" element={<Productos setCart={setCart} />} />
          <Route path="/producto_individual" element={<ProductoIndividual setCart={setCart} />} />
          <Route path="/producto_individual2" element={<ProductoIndividual2 setCart={setCart} />} />
          <Route path="/producto_individual3" element={<ProductoIndividual3 setCart={setCart} />} />
          <Route path="/producto_individual4" element={<ProductoIndividual4 setCart={setCart} />} />
          <Route path="/resenas" element={<Resenas />} />
        </Route>

        {/* Rutas sin layout */}
        <Route path="/login" element={<Login setCart={setCart} />} />
        <Route path="/nuevousuario" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
  );
}

export default App;