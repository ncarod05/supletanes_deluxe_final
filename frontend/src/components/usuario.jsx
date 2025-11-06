import React, { useState, useEffect, useRef } from "react";

const STORAGE_KEYS = ['loggedUser', 'user', 'usuario'];

const readStored = () => {
  try {
    for (const k of STORAGE_KEYS) {
      const raw = localStorage.getItem(k) || sessionStorage.getItem(k);
      if (!raw) continue;
      try {
        const parsed = JSON.parse(raw);
        return { nombre: parsed.nombre || '', email: parsed.email || '', telefono: parsed.telefono || '', direccion: parsed.direccion || '' };
      } catch (e) {
        return { nombre: '', email: String(raw), telefono: '', direccion: '' };
      }
    }
  } catch (e) {
    console.warn('Error leyendo storage en usuario:', e);
  }
  return { nombre: '', email: '', telefono: '', direccion: '' };
};

const persist = (payload) => {
  try {
    STORAGE_KEYS.forEach(k => localStorage.setItem(k, JSON.stringify(payload)));
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
  } catch (e) {
    console.warn('Error persistiendo usuario:', e);
  }
};

const Usuario = () => {
  const [user, setUser] = useState({ nombre: '', email: '', telefono: '', direccion: '' });
  const [original, setOriginal] = useState({ nombre: '', email: '', telefono: '', direccion: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errores, setErrores] = useState({}); //para validar la edicion
  const nombreRef = useRef(null);
  const telefonoRef = useRef(null);
  const direccionRef = useRef(null);

  useEffect(() => {
    const stored = readStored();
    setUser(stored);
    setOriginal(stored);
  }, []);

  useEffect(() => {
    if (isEditing) nombreRef.current?.focus();
  }, [isEditing]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'email') return; // email no editable aquí

    setUser(prev => ({ ...prev, [id]: value }));
    validarCampo(id, value);
  };

  // para mantener boton de guardar cambios desactivado si es igual
  const esIgualAlOriginal = () => {
    return (
      user.nombre === original.nombre &&
      user.telefono === original.telefono &&
      user.direccion === original.direccion
    );
  };

  const handleEditar = () => setIsEditing(true);

  const handleCancelar = () => {
    setUser(original);
    setIsEditing(false);
    setErrores({});
  };

  // obtener los errores
  const obtenerErrorCampo = (id, value) => {
    if (id === 'nombre' && (!value || value.trim().length < 3)) {
      return 'El nombre debe tener al menos 3 caracteres.';
    }
    if (id === 'telefono' && (!value || !/^9\d{8}$/.test(value.trim()))) {
      return 'El teléfono debe tener 9 dígitos y comenzar con 9 (ej: 912345678).';
    }
    if (id === 'direccion' && (!value || value.trim().length < 5)) {
      return 'La dirección debe tener al menos 5 caracteres.';
    }
    return '';
  }

  // validacion en tiempo real
  const validarCampo = (id, value) => {
    const error = obtenerErrorCampo(id, value);
    setErrores(prev => ({ ...prev, [id]: error }));
  };

  // validacion al guardar
  const validarCampos = () => {
    const nuevosErrores = {};
    ['nombre', 'telefono', 'direccion'].forEach(id => {
      const error = obtenerErrorCampo(id, user[id]);
      if (error) nuevosErrores[id] = error;
    });
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleGuardar = (e) => {
    e?.preventDefault?.();
    if (!validarCampos()) return;

    const toSave = { ...user, email: original.email || user.email };
    setUser(toSave);
    setOriginal(toSave);
    persist(toSave);
    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card usuario-card shadow-sm">
              <div className="card-header">
                <h2 className="mb-0 text-white">Mi Perfil</h2>
              </div>
              <div className="card-body">
                <form onSubmit={handleGuardar}>
                  <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre completo</label>
                    <input
                      ref={nombreRef}
                      id="nombre"
                      type="text"
                      className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
                      placeholder="Juan Pérez"
                      value={user.nombre}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                    {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo electrónico</label>
                    <input
                      id="email"
                      type="email"
                      className="form-control"
                      placeholder="juan@example.com"
                      value={user.email}
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="telefono" className="form-label">Teléfono</label>
                    <input
                      ref={telefonoRef}
                      id="telefono"
                      type="tel"
                      className={`form-control ${errores.telefono ? 'is-invalid' : ''}`}
                      placeholder="912345678"
                      value={user.telefono}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                    {errores.telefono && <div className="invalid-feedback">{errores.telefono}</div>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="direccion" className="form-label">Dirección</label>
                    <input
                      ref={direccionRef}
                      id="direccion"
                      type="text"
                      className={`form-control ${errores.direccion ? 'is-invalid' : ''}`}
                      placeholder="Av. Siempre Viva 742"
                      value={user.direccion}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                    {errores.direccion && <div className="invalid-feedback">{errores.direccion}</div>}
                  </div>

                  <div className="d-flex justify-content-end">
                    {!isEditing && (
                      <button type="button" className="button me-2" id="editarPerfil" onClick={handleEditar}>Editar</button>
                    )}
                    {isEditing && (
                      <>
                        <button type="submit" className="button me-2" id="guardarCambios" disabled={esIgualAlOriginal()}>Guardar cambios</button>
                        <button type="button" className="button button-outline-danger" onClick={handleCancelar}>Cancelar</button>
                      </>
                    )}
                  </div>

                  {saved && (
                    <div className="mt-3">
                      <div className="alert alert-success p-2 mb-0" role="alert">Perfil guardado</div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-5">
          <h3 className="mb-3">Mis últimos pedidos</h3>
          <div className="card mb-3">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <strong>#PED-00123</strong><br />
                Prostar Whey Protein 5LB<br />
                <small>Fecha: 03/09/2025</small>
              </div>
              <div className="text-end">
                <span className="badge bg-success mb-2">Entregado</span><br />
                <a href="/resenas" className="btn btn-outline-primary btn-sm">
                  <i className="bi bi-pencil-square me-1"></i> Dejar reseña
                </a>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <a href="/pedidos" className="button button-lg">Ver más</a>
          </div>
        </section>

        <section className="mt-5">
          <h3 className="mb-3">Mis favoritos</h3>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="product-card h-100 d-flex flex-column position-relative">
                <img src="/assets/img/Prostar 5LB.webp" className="img-fluid mb-3" alt="Ultimate Nutrition" style={{ maxHeight: "180px", objectFit: "contain" }} />
                <h5 className="mb-1">Prostar Whey Protein 5LB</h5>
                <p className="old-price">$69.990</p>
                <div className="card-price-highlight mb-2">$59.990</div>
                <div className="d-flex justify-content-between mt-auto">
                  <a href="/producto_individual" className="button mt-2">Ver más</a>
                  <button className="btn btn-outline-danger btn-sm mt-2" title="Quitar de favoritos">
                    <i className="bi bi-heartbreak"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="product-card h-100 d-flex flex-column position-relative">
                <img src="/assets/img/Multivitaminico.jpg" className="img-fluid mb-3" alt="Multivitamínicos Deluxe" style={{ maxHeight: "180px", objectFit: "contain" }} />
                <h5 className="mb-1">Multivitamínicos Deluxe</h5>
                <p className="old-price">$14.990</p>
                <div className="card-price-highlight mb-2">$11.990</div>
                <div className="d-flex justify-content-between mt-auto">
                  <a href="/producto_individual3" className="button mt-2">Ver más</a>
                  <button className="btn btn-outline-danger btn-sm mt-2" title="Quitar de favoritos">
                    <i className="bi bi-heartbreak"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Usuario;