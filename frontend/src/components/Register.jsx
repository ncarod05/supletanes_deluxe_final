import React, { useState } from 'react';
import '../assets/css/Register.css';
import { authService } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const STORAGE_KEYS = ['loggedUser', 'user', 'usuario'];

const saveTemp = (payload) => {
  try {
    STORAGE_KEYS.forEach(k => localStorage.setItem(k, JSON.stringify(payload)));
    // notificar a la app que el usuario temporal cambió (para que Navbar u otros lo detecten)
    try {
      window.dispatchEvent(new CustomEvent('userUpdated', { detail: payload }));
    } catch (err) {
      // algunos entornos pueden no soportar CustomEvent con detail; ignorar sin romper
      try {
        const ev = document.createEvent('CustomEvent');
        ev.initCustomEvent('userUpdated', false, false, payload);
        window.dispatchEvent(ev);
      } catch (e) {
        // no podemos notificar, pero el storage ya fue escrito
      }
    }
  } catch (e) {
    console.warn('No se pudo guardar en localStorage', e);
  }
};

const Register = () => {
  const [form, setForm] = useState({
    username: '',
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.username.trim()) newErrors.username = 'El nombre de usuario es obligatorio';
    if (form.username.length < 3) newErrors.username = 'Mínimo 3 caracteres';
    if (form.username.length > 50) newErrors.username = 'Máximo 50 caracteres';
    if (!form.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
    if (!form.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = 'Correo inválido';
    if (form.password.length < 6) newErrors.password = 'Mínimo 6 caracteres';
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const next = { ...form, [name]: value };
    setForm(next);

    // Persistir temporalmente solo campos públicos (NO guardar contraseña)
    const publicPayload = {
      username: next.username,
      nombre: next.nombre,
      email: next.email,
    };
    saveTemp(publicPayload);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const payload = {
          username: form.username,
          password: form.password,
          nombre: form.nombre,
          email: form.email
        };

        const response = await authService.register(payload);
        console.log('Registro exitoso:', response);

        setSuccess(true);
        setTimeout(() => navigate('/'), 1200);
      } catch (err) {
        console.error('Error en registro:', err);
        setErrors({ general: 'No se pudo registrar el usuario' });
        setSuccess(false);
      }
    } else {
      setSuccess(false);
    }
  };


  return (
    <div className="page-root">
      <div className="page-content">
        <div className="register-container">
          <form className="register-form" onSubmit={handleSubmit}>
            <h2>Crear Cuenta</h2>
            {errors.username && <div className="register-error">{errors.username}</div>}
            <input
              type="text"
              name="username"
              placeholder="Nombre De Usuario"
              value={form.username}
              onChange={handleChange}
            />

            {errors.nombre && <div className="register-error">{errors.nombre}</div>}
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={form.nombre}
              onChange={handleChange}
            />


            {errors.email && <div className="register-error">{errors.email}</div>}
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={form.email}
              onChange={handleChange}
            />

            {errors.password && <div className="register-error">{errors.password}</div>}
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
            />

            {errors.confirmPassword && <div className="register-error">{errors.confirmPassword}</div>}
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar Contraseña"
              value={form.confirmPassword}
              onChange={handleChange}
            />

            <button type="submit">Registrarse</button>
            {success && <div className="register-success">¡Cuenta creada exitosamente! (datos guardados temporalmente)</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;