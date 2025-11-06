import React, { useState, useEffect } from 'react';
import '../assets/css/Login.css';

const STORAGE_KEYS = ['loggedUser', 'user', 'usuario'];

const notifyUserUpdated = (payload) => {
  try {
    window.dispatchEvent(new CustomEvent('userUpdated', { detail: payload }));
  } catch (err) {
    try {
      const ev = document.createEvent('CustomEvent');
      ev.initCustomEvent('userUpdated', false, false, payload);
      window.dispatchEvent(ev);
    } catch (e) {
      // ignore
    }
  }
};

const saveTemp = (payload) => {
  try {
    STORAGE_KEYS.forEach(k => localStorage.setItem(k, JSON.stringify(payload)));
    notifyUserUpdated(payload);
  } catch (e) {
    console.warn('Error saving temp user in login', e);
  }
};

const Login = ({ setCart }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Prefill email si existe en storage
    try {
      const keys = STORAGE_KEYS;
      for (const k of keys) {
        const raw = localStorage.getItem(k) || sessionStorage.getItem(k);
        if (!raw) continue;
        try {
          const parsed = JSON.parse(raw);
          if (parsed && parsed.email) {
            setEmail(parsed.email);
            break;
          }
        } catch {
          // raw puede ser un string con el email
          setEmail(String(raw));
          break;
        }
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const isAdmin = email === 'admin@gmail.com';
    const payload = {
      nombre: isAdmin ? 'Administrador' : '',
      email,
      telefono: '',
      direccion: '',
      rol: isAdmin ? 'admin' : 'usuario'
    };
    
    // Guardar en varias claves para compatibilidad con el resto de la app
    saveTemp(payload);

    const productosIniciales = [
      { nombre: "Prostar Whey Protein 5LB", cantidad: 1, precio: 59990 },
      { nombre: "Multivitamínico Completo 60 caps", cantidad: 2, precio: 23980 },
    ];
    localStorage.setItem("carrito", JSON.stringify(productosIniciales));
    if (typeof setCart === 'function') setCart(productosIniciales);

    // Precargar datos de admin y carrito si no existen
    if (!localStorage.getItem('adminProductos')) {
      const productosAdminIniciales = [
        { id: 1, nombre: 'Proteína Whey', precio: 19990, descripcion: 'Proteína de suero', categoria: 'Proteína', stock: 36 },
        { id: 2, nombre: 'Creatina Monohidratada', precio: 14990, descripcion: 'Creatina para fuerza', categoria: 'Creatina', stock: 67 }
      ];
      localStorage.setItem('adminProductos', JSON.stringify(productosAdminIniciales));
    }

    window.location.href = '/';
  };

  return (
    <div className="page-root">
      <div className="page-content">
        <div className="login-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>Iniciar Sesión</h2>
            {error && <div className="login-error">{error}</div>}
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="form-text text-center mb-2">¿No tienes una cuenta? <a href="/nuevousuario" className="link-primary">Crear cuenta</a></div>
            <button type="submit">Entrar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
