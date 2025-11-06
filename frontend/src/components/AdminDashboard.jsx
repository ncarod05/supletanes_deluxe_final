import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function AdminDashboard() {
  return (
    <>
      <main className="mt-5">
        <Container>
          <h2 className="mb-2 text-center">Panel de Administrador</h2>
          <Row className="justify-content-center">
              <Col md={3} className='d-flex'>
                <i class="bi bi-person-vcard" style={{ fontSize: '18rem', color: '#264653' }}></i>
              </Col>

              <Col className="admin-info">
                <h3>Nombre: Juan Pérez Ramirez</h3>
                <h3>Rut: XX.XXX.XXX-X</h3>
              </Col>
          </Row>

          <Row className="justify-content-center">
            {/* Gestión de Productos */}
            <Col md={3} className="d-flex">
              <Card className="mb-4 text-center shadow-sm h-100 w-100 admin-card">
                <Card.Body className="d-flex flex-column justify-content-between">
                  <i className="bi bi-box-seam fs-1 text-primary mb-3"></i>
                  <Card.Title>Gestión de Productos</Card.Title>
                  <Card.Text>Agrega, edita o elimina productos del catálogo.</Card.Text>
                  <Button variant="outline-primary" href="/admin/productos">Ir</Button>
                </Card.Body>
              </Card>
            </Col>

            {/* Pedidos */}
            <Col md={3} className="d-flex">
              <Card className="mb-4 text-center shadow-sm h-100 w-100 admin-card">
                <Card.Body className="d-flex flex-column justify-content-between">
                  <i className="bi bi-truck fs-1 text-warning mb-3"></i>
                  <Card.Title>Pedidos</Card.Title>
                  <Card.Text>Revisa los pedidos realizados por los usuarios.</Card.Text>
                  <Button variant="outline-warning" href="/admin/pedidos">Ir</Button>
                </Card.Body>
              </Card>
            </Col>

            {/* Usuarios */}
            <Col md={3} className="d-flex">
              <Card className="mb-4 text-center shadow-sm h-100 w-100 admin-card">
                <Card.Body className="d-flex flex-column justify-content-between">
                  <i className="bi bi-people fs-1 text-success mb-3"></i>
                  <Card.Title>Usuarios</Card.Title>
                  <Card.Text>Administra cuentas de usuario.</Card.Text>
                  <Button variant="outline-success" href="/admin/usuarios">Ir</Button>
                </Card.Body>
              </Card>
            </Col>

            {/* Reportes */}
            <Col md={3} className="d-flex">
              <Card className="mb-4 text-center shadow-sm h-100 w-100 admin-card">
                <Card.Body className="d-flex flex-column justify-content-between">
                  <i className="bi bi-bar-chart-line fs-1 text-info mb-3"></i>
                  <Card.Title>Reportes</Card.Title>
                  <Card.Text>Visualiza estadísticas clave del negocio.</Card.Text>
                  <Button variant="outline-info" href="/admin/reportes">Ir</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
}

export default AdminDashboard