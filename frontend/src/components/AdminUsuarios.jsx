import React, { useState } from 'react';
import { Container, Table, Button, Modal, Form, Badge } from 'react-bootstrap';

function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: 'Juan Pérez', email: 'juan@example.com', rol: 'usuario' },
    { id: 2, nombre: 'María López', email: 'maria@example.com', rol: 'admin' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [datosUsuario, setDatosUsuario] = useState({ nombre: '', email: '', rol: 'usuario' });

  const abrirModal = (usuario = null) => {
    setUsuarioEditando(usuario);
    setDatosUsuario(usuario || { nombre: '', email: '', rol: 'usuario' });
    setShowModal(true);
  };

  const cerrarModal = () => {
    setShowModal(false);
    setUsuarioEditando(null);
    setDatosUsuario({ nombre: '', email: '', rol: 'usuario' });
  };

  const guardarUsuario = () => {
    if (usuarioEditando) {
      setUsuarios(usuarios.map(u =>
        u.id === usuarioEditando.id ? { ...usuarioEditando, ...datosUsuario } : u
      ));
    } else {
      const nuevo = {
        id: usuarios.length + 1,
        ...datosUsuario,
      };
      setUsuarios([...usuarios, nuevo]);
    }
    cerrarModal();
  };

  const eliminarUsuario = (id) => {
    setUsuarios(usuarios.filter(u => u.id !== id));
  };

  return (
    <>
      <Container className="mt-5">
        <h2 className="mb-4">Gestión de Usuarios</h2>
        <Button variant="success" className="mb-3" onClick={() => abrirModal()}>
          Crear Usuario
        </Button>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(usuario => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.email}</td>
                <td>
                  <Badge bg={usuario.rol === 'admin' ? 'primary' : 'secondary'}>
                    {usuario.rol}
                  </Badge>
                </td>
                <td>
                  <Button variant="warning" size="sm" className="me-2" onClick={() => abrirModal(usuario)}>Editar</Button>{' '}
                  <Button variant="danger" size="sm" onClick={() => eliminarUsuario(usuario.id)}>Eliminar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      {/* Modal */}
      <Modal show={showModal} onHide={cerrarModal}>
        <Modal.Header closeButton>
          <Modal.Title>{usuarioEditando ? 'Editar Usuario' : 'Nuevo Usuario'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={datosUsuario.nombre}
                onChange={(e) => setDatosUsuario({ ...datosUsuario, nombre: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={datosUsuario.email}
                onChange={(e) => setDatosUsuario({ ...datosUsuario, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Rol</Form.Label>
              <Form.Select
                value={datosUsuario.rol}
                onChange={(e) => setDatosUsuario({ ...datosUsuario, rol: e.target.value })}
              >
                <option value="usuario">Usuario</option>
                <option value="admin">Administrador</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarModal}>Cancelar</Button>
          <Button variant="primary" onClick={guardarUsuario}>Guardar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AdminUsuarios;