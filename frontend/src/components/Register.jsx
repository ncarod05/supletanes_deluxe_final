import React, { useState } from 'react';
import '../assets/css/Register.css';

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
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    confirmPassword: '',
    telefono: '',
    direccion: '',
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
    if (!form.apellido.trim()) newErrors.apellido = 'El apellido es obligatorio';
    if (!form.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = 'Correo inválido';
    if (form.password.length < 6) newErrors.password = 'Mínimo 6 caracteres';
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden';
    if (!form.telefono.match(/^\d{9}$/)) newErrors.telefono = 'Teléfono de 9 dígitos';
    if (!form.direccion.trim()) newErrors.direccion = 'La dirección es obligatoria';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const next = { ...form, [name]: value };
    setForm(next);

    // Persistir temporalmente solo campos públicos (NO guardar contraseña)
    const publicPayload = {
      nombre: next.nombre,
      email: next.email,
      telefono: next.telefono,
      direccion: next.direccion,
    };
    saveTemp(publicPayload);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      // Guardar temporalmente sin contraseña para que perfil lo lea
      const publicPayload = {
        nombre: form.nombre,
        email: form.email,
        telefono: form.telefono,
        direccion: form.direccion,
      };
      saveTemp(publicPayload);

      setSuccess(true);
      setTimeout(() => {
        // redirigir
        window.location.href = '/';
      }, 1200);
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
        {errors.nombre && <div className="register-error">{errors.nombre}</div>}
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
        />

        {errors.apellido && <div className="register-error">{errors.apellido}</div>}
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={form.apellido}
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

        {errors.telefono && <div className="register-error">{errors.telefono}</div>}
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono (9 dígitos)"
          value={form.telefono}
          onChange={handleChange}
        />

        {errors.direccion && <div className="register-error">{errors.direccion}</div>}
        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={form.direccion}
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