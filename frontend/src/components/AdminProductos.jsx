import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';
const API_PRODUCTOS = `${API_BASE_URL}/api/productos`; // Endpoint base (para POST, PUT, DELETE)
const API_PRODUCTOS_ACTIVOS = `${API_PRODUCTOS}/activos`; // Endpoint para GET
const API_CATEGORIAS = `${API_BASE_URL}/api/categorias`;
const API_MARCAS = `${API_BASE_URL}/api/marcas`;

function AdminProductos() {
  const [productos, setProductos] = useState([]); // Inicia vacío, ya no usa localStorage
  const [loading, setLoading] = useState(true); // Estado para mostrar si está cargando
  const [error, setError] = useState(null); // Estado para manejar errores

  // Estados para datos relacionados
  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);

  // Función para cargar categorías
  const cargarCategorias = async () => {
    try {
      const response = await axios.get(API_CATEGORIAS);
      setCategorias(response.data);
    } catch (error) {
      console.error('Error al cargar categorías:', error);
    }
  };

  // Función para cargar marcas
  const cargarMarcas = async () => {
    try {
      const response = await axios.get(API_MARCAS);
      setMarcas(response.data);
    } catch (error) {
      console.error('Error al cargar marcas:', error);
    }
  };

  // Función para cargar productos
  const cargarProductos = async () => {
    try {
      setLoading(true); // Inicia la carga
      const response = await axios.get(API_PRODUCTOS_ACTIVOS);
      setProductos(response.data);
      setError(null);
    } catch (err) {
      console.error("Error al cargar productos:", err);
      setError("Fallo al conectar con el servidor. ¿El backend está corriendo?");
    } finally {
      setLoading(false); // Finaliza la carga
    }
  };

  // Reemplaza la lógica de localStorage
  useEffect(() => {
    cargarProductos();
    cargarCategorias();
    cargarMarcas();
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    precio: '',
    categoriaId: '',  // Mandamos los ID
    marcaId: '',
    stock: '',
  });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);

  const abrirModal = (producto = null) => {
    setModoEdicion(!!producto);
    setProductoEditando(producto);

    // Mapear los datos del producto (si existe) para rellenar el formulario
    const dataParaModal = producto ? {
      // Campos simples
      nombre: producto.nombre,
      precio: producto.precio,
      stock: producto.stock,
      categoriaId: producto.categoriaId || '',
      marcaId: producto.marcaId || '',
    } : {
      // Valores por defecto para crear
      nombre: '',
      precio: '',
      categoriaId: '',
      marcaId: '',
      stock: '',
    };

    setNuevoProducto(dataParaModal);
    setShowModal(true);
  };

  const cerrarModal = () => {
    setShowModal(false);
    setNuevoProducto({ nombre: '', precio: '' });
    setProductoEditando(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto(prev => ({
      ...prev,
      [name]: value // Esto actualiza la propiedad 'marca' o 'categoria' según el 'name'
    }));
  };

  const guardarProducto = async () => {
    const { nombre, precio, marcaId, categoriaId, stock } = nuevoProducto;
    // Asignar estado en true por defecto
    const estado = true;

    if (!nombre || nombre.length < 3 || !precio || precio <= 0 || !stock || !marcaId || !categoriaId) {
      alert('Completa todos los campos obligatorios (Nombre, Precio, Stock, Marca y Categoría).');
      return;
    }

    // Mapeo simple para coincidir con el RequestDTO
    const productoRequest = {
      nombre: nombre,
      precio: parseFloat(precio),
      stock: parseInt(stock),
      estado: estado,
      // IDs de las relaciones
      marcaId: parseInt(marcaId),
      categoriaId: parseInt(categoriaId),
      ...(modoEdicion && { id: productoEditando.id }),
    };

    try {
      if (modoEdicion) {
        // Petición PUT para ACTUALIZAR
        if (!productoEditando.id) {
          alert('Error: No se encontró el ID para editar.');
          return;
        }
        await axios.put(`${API_PRODUCTOS}/${productoEditando.id}`, productoRequest);
      } else {
        // Petición POST para CREAR
        await axios.post(API_PRODUCTOS, productoRequest);
      }

      cargarProductos();
      cerrarModal();

    } catch (err) {
      alert('Error al guardar el producto. Revisa la consola para detalles.');
      console.error("Error al guardar:", err.response ? err.response.data : err);
    }
  };

  const eliminarProducto = async (id) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este producto?')) return;

    try {
      await axios.delete(`${API_PRODUCTOS}/${id}`);
      cargarProductos();

    } catch (err) {
      alert('Error al eliminar el producto. Revisa la consola para detalles.');
      console.error("Error al eliminar:", err.response ? err.response.data : err);
    }
  };

  return (
    <>
      <Container className="mt-5">
        <h2 className="mb-3">Gestión de Productos</h2>

        {/*Muestra el estado de carga*/}
        {loading && (
          <div className="text-center my-4">
            <p className="text-info">Cargando productos activos...</p>
          </div>
        )}

        {/*Muestra el estado de error*/}
        {error && (
          <div className="alert alert-danger" role="alert">
            <p>¡Error de Conexión!</p>
            <p className="mb-0">**{error}**</p>
          </div>
        )}

        {/*Muestra el contenido solo si no está cargando y no hay error*/}
        {!loading && !error && (
          <>
            <Button variant="success" className="mb-3" onClick={() => abrirModal()}>
              Agregar Producto
            </Button>

            {productos.length === 0 ? (
              <div className="alert alert-warning">
                No se encontraron productos activos.
              </div>
            ) : (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Marca</th>
                    <th>Categoría</th>
                    <th>Stock</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map(producto => (
                    <tr key={producto.id}>
                      <td>{producto.id}</td>
                      <td>{producto.nombre}</td>
                      <td>${producto.precio.toLocaleString()}</td>
                      <td>{producto.marcaNombre || 'N/A'}</td>
                      <td>{producto.categoriaNombre || 'N/A'}</td>
                      <td>{producto.stock}</td>
                      <td>
                        <Button variant="warning" size="sm" className="me-2" onClick={() => abrirModal(producto)}>Editar</Button>{' '}
                        <Button variant="danger" size="sm" onClick={() => eliminarProducto(producto.id)}>Eliminar</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </>
        )}
      </Container>

      {/* Modal */}
      <Modal show={showModal} onHide={cerrarModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modoEdicion ? 'Editar Producto' : 'Nuevo Producto'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Marca</Form.Label>
              <Form.Select
                name="marcaId" // el nombre que spring espera
                value={nuevoProducto.marcaId} // usar la propiedad de ID en el estado
                onChange={handleChange}
              >
                <option value="">Selecciona Marca</option>
                {marcas.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={nuevoProducto.nombre}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name="precio"
                value={nuevoProducto.precio}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Categoría</Form.Label>
              <Form.Select
                name="categoriaId"
                value={nuevoProducto.categoriaId}
                onChange={handleChange}
              >
                <option value="">Selecciona Categoría</option>
                {categorias.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                value={nuevoProducto.stock}
                onChange={handleChange}
                min={0}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarModal}>Cancelar</Button>
          <Button variant="primary" onClick={guardarProducto}>Guardar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AdminProductos;