import React, { useEffect, useState } from 'react';

const STORAGE_KEYS = ['loggedUser', 'user', 'usuario'];

const clearUserStorage = () => {
  try {
    STORAGE_KEYS.forEach(k => {
      localStorage.removeItem(k);
      sessionStorage.removeItem(k);
    });
  } catch (e) {
    console.warn('Error clearing storage on logout', e);
  }
};

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

const Logout = () => {
  const [count, setCount] = useState(3);

  useEffect(() => {
    // limpiar almacenamiento y notificar cambio
    clearUserStorage();
    notifyUserUpdated({ nombre: '', email: '' });

    const t = setInterval(() => {
      setCount(c => c - 1);
    }, 1000);

    const redirect = setTimeout(() => {
      clearInterval(t);
      // redireccionar a home
      window.location.href = '/';
    }, 3000);

    return () => {
      clearInterval(t);
      clearTimeout(redirect);
    };
  }, []);

  return (
    <div className="page-root">
      <div className="page-content d-flex align-items-center justify-content-center">
        <div className="text-center p-4">
          <h2>Cerrando sesión</h2>
          <p>Redirigiendo a la página principal en {count}...</p>
        </div>
      </div>
    </div>
  );
};

export default Logout;
