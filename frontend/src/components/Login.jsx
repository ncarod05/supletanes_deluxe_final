import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Prefill username si existe en storage
    try {
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
      } else {
        // Intentar con las claves antiguas
        const keys = STORAGE_KEYS;
        for (const k of keys) {
          const raw = localStorage.getItem(k) || sessionStorage.getItem(k);
          if (!raw) continue;
          try {
            const parsed = JSON.parse(raw);
            if (parsed && parsed.email) {
              setUsername(parsed.email);
              break;
            }
          } catch {
            setUsername(String(raw));
            break;
          }
        }
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Llamar al backend para autenticar
      const response = await authService.login(username, password);

      console.log('Login exitoso:', response);

      // Crear payload compatible con el sistema anterior
      const payload = {
        nombre: response.username === 'admin' ? 'Administrador' : response.username,
        email: `${response.username}@suplementos.com`, // Email ficticio para compatibilidad
        telefono: '',
        direccion: '',
        rol: response.role === 'ADMIN' ? 'admin' : 'usuario',
        username: response.username,
        role: response.role
      };

      // Guardar en las claves antiguas para compatibilidad
      saveTemp(payload);
      
      // Redirigir a inicio
      navigate('/');
      
    } catch (error) {
      console.error('Error en login:', error);
      setError('Usuario o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-root">
      <div className="page-content">
        <div className="login-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>Iniciar Sesión</h2>
            {error && <div className="login-error">{error}</div>}
            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
            <div className="form-text text-center mb-2">
              ¿No tienes una cuenta? <a href="/nuevousuario" className="link-primary">Crear cuenta</a>
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Iniciando sesión...' : 'Entrar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;