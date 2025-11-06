import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function AdminReportes() {
  const totalProductos = 12;
  const totalUsuarios = 45;
  const totalPedidos = 87;
  const ingresosTotales = 1299900;

  return (
    <>
      <Container className="mt-5">
        <h2 className="mb-4">Reportes y Estadísticas</h2>
        <Row className="mb-4">
          <Col md={3}>
            <Card bg="info" text="white" className="text-center">
              <Card.Body>
                <Card.Title>Productos</Card.Title>
                <Card.Text className="fs-3">{totalProductos}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card bg="primary" text="white" className="text-center">
              <Card.Body>
                <Card.Title>Usuarios</Card.Title>
                <Card.Text className="fs-3">{totalUsuarios}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card bg="warning" text="dark" className="text-center">
              <Card.Body>
                <Card.Title>Pedidos</Card.Title>
                <Card.Text className="fs-3">{totalPedidos}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card bg="success" text="white" className="text-center">
              <Card.Body>
                <Card.Title>Ingresos</Card.Title>
                <Card.Text className="fs-3">${ingresosTotales.toLocaleString()}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card className="mb-5">
          <Card.Body>
            <Card.Title>Resumen</Card.Title>
            <Card.Text>
              En el último mes se han registrado <strong>{totalPedidos}</strong> pedidos por un total estimado de <strong>${ingresosTotales.toLocaleString()}</strong>. El catálogo cuenta con <strong>{totalProductos}</strong> productos activos y <strong>{totalUsuarios}</strong> usuarios registrados.
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default AdminReportes;