import React, { useState } from 'react';
import { Container, Table, Button, Badge } from 'react-bootstrap';

function AdminPedidos() {
  const [pedidos, setPedidos] = useState([
    {
      id: 101,
      usuario: 'Juan Pérez',
      productos: ['Proteína Whey', 'Creatina'],
      total: 34980,
      estado: 'Pendiente',
    },
    {
      id: 102,
      usuario: 'María López',
      productos: ['BCAA', 'Multivitamínico'],
      total: 27990,
      estado: 'Enviado',
    },
  ]);

  const cambiarEstado = (id, nuevoEstado) => {
    setPedidos(pedidos.map(p =>
      p.id === id ? { ...p, estado: nuevoEstado } : p
    ));
  };

  const obtenerColorEstado = (estado) => {
    switch (estado) {
      case 'Pendiente': return 'warning';
      case 'Enviado': return 'info';
      case 'Entregado': return 'success';
      default: return 'secondary';
    }
  };

  return (
    <>
      <Container className="mt-5">
        <h2 className="mb-4">Pedidos de Usuarios</h2>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID Pedido</th>
              <th>Usuario</th>
              <th>Productos</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map(pedido => (
              <tr key={pedido.id}>
                <td>{pedido.id}</td>
                <td>{pedido.usuario}</td>
                <td>{pedido.productos.join(', ')}</td>
                <td>${pedido.total.toLocaleString()}</td>
                <td>
                  <Badge bg={obtenerColorEstado(pedido.estado)}>{pedido.estado}</Badge>
                </td>
                <td>
                  {pedido.estado !== 'Entregado' && (
                    <>
                      <Button
                        variant="info"
                        size="sm"
                        className="me-3"
                        onClick={() => cambiarEstado(pedido.id, 'Enviado')}
                      >
                        Marcar como Enviado
                      </Button>
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => cambiarEstado(pedido.id, 'Entregado')}
                      >
                        Marcar como Entregado
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default AdminPedidos;