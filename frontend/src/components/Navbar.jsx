import React, { useEffect, useState } from 'react';

const STORAGE_KEYS = ['loggedUser', 'user', 'usuario'];

const readStoredUser = () => {
  try {
    for (const k of STORAGE_KEYS) {
      const raw = localStorage.getItem(k) || sessionStorage.getItem(k);
      if (!raw) continue;
      try {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') return parsed;
      } catch (err) {
        // si no es JSON válido, devolverlo como email/texto
        return { nombre: '', email: String(raw) };
      }
    }
  } catch (e) {
    console.warn('Error leyendo usuario desde storage', e);
  }
  return { nombre: '', email: '' };
};

function Navbar({ cartCount = 0 }) {
  const [storedUser, setStoredUser] = useState(() => readStoredUser());

  const hasUser = storedUser && (storedUser.nombre || storedUser.email);
  const isAdmin = storedUser && storedUser.rol === 'admin';

  useEffect(() => {
    const onUpdate = (e) => {
      setStoredUser(e?.detail ? e.detail : readStoredUser());
    };
    window.addEventListener('userUpdated', onUpdate);
    return () => window.removeEventListener('userUpdated', onUpdate);
  }, []);

  const handleLogout = () => {
    try {
      STORAGE_KEYS.forEach(k => localStorage.removeItem(k));
      STORAGE_KEYS.forEach(k => sessionStorage.removeItem(k));
      localStorage.removeItem('carrito'); // limpiar carrito al cerrar sesión
    } catch (e) {
      console.warn('Error limpiando storage en logout', e);
    }
    setStoredUser({ nombre: '', email: '' });

    // Evitar recarga si estamos en entorno de test, para validar cierre de sesion
    if (!window.__TEST_MODE__) {
      window.location.href = '/logout'; // enviar a logout
    }
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid">
        <a className="navbar-brand custom-brand" href="/">Supletanes Deluxe</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll"
          aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
            <li className="nav-item">
              <a className="nav-link active custom-link" href="/">Inicio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link custom-link" href="/productos">Productos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link custom-link" href="/quienes">Quienes somos</a>
            </li>
            <li className="nav-item">
              {!hasUser && (
                <a className="nav-link custom-link" href="/login">Iniciar Sesión</a>
              )}
            </li>
          </ul>
          <form className="d-flex align-items-center" role="search">
            <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Buscar" />
            <button className="button me-3" type="submit">Buscar</button>
          </form>
          <div className="d-flex align-items-center gap-3">
            <a href="/carrito" className="text-white text-decoration-none position-relative" title="Carrito de compras">
              <i className="bi bi-cart3 fs-4"></i>
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartCount}
                </span>
              )}
            </a>
            <div className="dropdown">
              <a href="#" className="text-white text-decoration-none d-flex align-items-center"
                id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false" title="Mi cuenta">
                <i className="bi bi-person-circle fs-4"></i>
                {hasUser && (
                  <div className="ms-2 d-flex flex-column text-start">
                    <span className="fw-bold" style={{ lineHeight: 1 }}>{storedUser.nombre || ''}</span>
                    <span className="small text-light">{storedUser.email || ''}</span>
                  </div>
                )}
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                {!hasUser && <li><a className="dropdown-item" href="/login">Iniciar Sesión</a></li>}
                {!hasUser && <li><a className="dropdown-item" href="/nuevousuario">Crear Cuenta</a></li>}
                {isAdmin && <li><a className="dropdown-item" href="/admin">Panel de Administrador</a></li>}
                {hasUser && <li><a className="dropdown-item" href="/usuario">Mi Perfil</a></li>}
                {hasUser && <li><a className="dropdown-item" href="/pedidos">Mis Pedidos</a></li>}
                {hasUser && <li><hr className="dropdown-divider" /></li>}
                {hasUser && <li><button className="dropdown-item" onClick={handleLogout}>Cerrar sesión</button></li>}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;