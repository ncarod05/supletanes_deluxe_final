import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';

function AdminProductos() {
  const [productos, setProductos] = useState(() => {
    const guardados = localStorage.getItem('adminProductos');
    return guardados ? JSON.parse(guardados) : [
      { id: 1, nombre: 'Proteína Whey', precio: 19990, categoria: 'Proteina', stock: 58 },
      { id: 2, nombre: 'Creatina Monohidratada', precio: 14990, categoria: 'Creatina', stock: 63 },
    ];
  });

  useEffect(() => {
    localStorage.setItem('adminProductos', JSON.stringify(productos));
  }, [productos]);

  const [showModal, setShowModal] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    categoria: '',
    stock: '',
  });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);

  const abrirModal = (producto = null) => {
    setModoEdicion(!!producto);
    setProductoEditando(producto);
    setNuevoProducto(producto || { nombre: '', precio: '' });
    setShowModal(true);
  };

  const cerrarModal = () => {
    setShowModal(false);
    setNuevoProducto({ nombre: '', precio: '' });
    setProductoEditando(null);
  };

  const guardarProducto = () => {
    const { nombre, precio, categoria, stock } = nuevoProducto;
    if (!nombre || nombre.length < 3 || !precio || precio <= 0 || !categoria || stock === '') {
      alert('Completa todos los campos obligatorios correctamente.');
      return;
    }

    const productoFinal = {
      ...nuevoProducto,
      precio: parseInt(precio),
      stock: parseInt(stock),
      id: modoEdicion ? productoEditando.id : productos.length + 1,
    };

    if (modoEdicion) {
      setProductos(productos.map(p => p.id === productoEditando.id ? productoFinal : p));
    } else {
      setProductos([...productos, productoFinal]);
    }

    cerrarModal();
  };

  const eliminarProducto = (id) => {
    setProductos(productos.filter(p => p.id !== id));
  };

  return (
    <>
      <Container className="mt-5">
        <h2 className="mb-3">Gestión de Productos</h2>
        <Button variant="success" className="mb-3" onClick={() => abrirModal()}>
          Agregar Producto
        </Button>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
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
                <td>{producto.categoria}</td>
                <td>{producto.stock}</td>
                <td>
                  <Button variant="warning" size="sm" className="me-2" onClick={() => abrirModal(producto)}>Editar</Button>{' '}
                  <Button variant="danger" size="sm" onClick={() => eliminarProducto(producto.id)}>Eliminar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      {/* Modal */}
      <Modal show={showModal} onHide={cerrarModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modoEdicion ? 'Editar Producto' : 'Nuevo Producto'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={nuevoProducto.nombre}
                onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                value={nuevoProducto.precio}
                onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={nuevoProducto.descripcion}
                onChange={(e) => setNuevoProducto({ ...nuevoProducto, descripcion: e.target.value })}
                maxLength={200}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Categoría</Form.Label>
              <Form.Select
                value={nuevoProducto.categoria}
                onChange={(e) => setNuevoProducto({ ...nuevoProducto, categoria: e.target.value })}
              >
                <option value="">Selecciona una categoría</option>
                <option value="Proteína">Proteína</option>
                <option value="Creatina">Creatina</option>
                <option value="Pre-entreno">Pre-entreno</option>
                <option value="Vitaminas">Vitaminas</option>
                <option value="Omega-3">Omega-3</option>
                <option value="Barras Proteicas">Barras Proteicas</option>
                <option value="Ganadores De Peso">Ganadores De Peso</option>
                <option value="Probióticos">Probióticos</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                value={nuevoProducto.stock}
                onChange={(e) => setNuevoProducto({ ...nuevoProducto, stock: e.target.value })}
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