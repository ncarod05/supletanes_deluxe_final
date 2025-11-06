import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Table, Badge } from 'react-bootstrap';

function ProductoIndividual2({ setCart }) {
    const [cantidad, setCantidad] = useState(1);
    const producto = {
        nombre: "Gold Standard Whey 5LB",
        cantidad: cantidad,
        precio: 69990,
    };

    const agregarAlCarrito = () => {
        const nuevoProducto = { ...producto };

        // Leer carrito actual desde localStorage
        const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];

        // Verificar si ya existe
        const existe = carritoActual.find(p => p.nombre === nuevoProducto.nombre);
        let actualizado;

        if (existe) {
            actualizado = carritoActual.map(p =>
                p.nombre === nuevoProducto.nombre
                    ? { ...p, cantidad: p.cantidad + 1 }
                    : p
            );
        } else {
            actualizado = [...carritoActual, nuevoProducto];
        }

        // Guardar en localStorage
        localStorage.setItem("carrito", JSON.stringify(actualizado));

        // Actualizar estado
        setCart(actualizado);

        //Alerta
        alert("Producto agregado al carrito 🛒");
    };

    return (
        <>
            <main>
                <Container className="my-5 product-page">
                    <Row>
                        <Col md={5}>
                            <img
                                src="/assets/img/Gold Standard 5LB.webp"
                                alt="Gold Standard Whey 5LB"
                                className="img-fluid rounded"
                            />
                        </Col>

                        <Col md={7}>
                            <p className="text-uppercase text-muted brand-text">Optimum Nutrition</p>
                            <h2 className="mb-3">Gold Standard Whey 5LB</h2>
                            <p className="text-muted mb-2"><strong>Categoría:</strong> Proteínas</p>
                            <p className="mb-3">
                                Gold Standard Whey es un suplemento proteico premium que combina aislado y concentrado de suero de leche,
                                ofreciendo 24g de proteína por porción. Ideal para recuperación muscular y crecimiento.
                            </p>

                            <div className="mb-3 price-container-vertical">
                                <span className="card-price-highlight">
                                    <i className="bi bi-tag-fill me-1"></i> $69.990
                                </span>
                                <span className="old-price ms-2">$79.990</span>
                            </div>

                            <Form.Group className="mb-3 w-50">
                                <Form.Label>Sabor:</Form.Label>
                                <Form.Select>
                                    <option value="chocolate">Chocolate</option>
                                    <option value="vainilla">Vainilla</option>
                                    <option value="fresa">Fresa</option>
                                    <option value="cookies">Cookies & Cream</option>
                                </Form.Select>
                            </Form.Group>

                            <div className="mb-3">
                                <Badge bg="success"><i className="bi bi-check-circle me-1"></i> Disponible</Badge>
                                <p className="text-muted mt-1">Unidades restantes: <strong>20</strong></p>
                            </div>

                            <Form.Group className="mb-3 w-25">
                                <Form.Label>Cantidad:</Form.Label>
                                <Form.Control
                                    type="number"
                                    min={1}
                                    value={cantidad}
                                    onChange={e => setCantidad(Number(e.target.value))}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3 w-50">
                                <Form.Label>Método de despacho:</Form.Label>
                                <Form.Select>
                                    <option value="retiro">Retiro en tienda</option>
                                    <option value="domicilio">Domicilio</option>
                                </Form.Select>
                            </Form.Group>

                            <div className="d-flex gap-3 mb-3">
                                <Button variant="success" size="lg" className="flex-grow-1" onClick={agregarAlCarrito}>
                                    <i className="bi bi-cart-plus me-1"></i> Agregar al carrito
                                </Button>
                                <Button variant="outline-danger" size="lg" className="flex-grow-1">
                                    <i className="bi bi-heart me-1"></i> Agregar a deseos
                                </Button>
                            </div>
                        </Col>
                    </Row>

                    <Row className="mt-5 product-page-nutrition row section-box">
                        <Col md={6}>
                            <h4>Descripción del producto</h4>
                            <p>
                                Gold Standard Whey 5LB combina aislado y concentrado de proteína de suero para maximizar
                                el crecimiento y la recuperación muscular. Bajo en grasas y carbohidratos, ideal para mantener tu dieta.
                            </p>
                            <ul>
                                <li>24g proteína por porción</li>
                                <li>Bajo en grasas y azúcares</li>
                                <li>80 porciones por envase</li>
                            </ul>
                        </Col>

                        <Col md={6}>
                            <h4>Información nutricional</h4>
                            <Table bordered>
                                <thead>
                                    <tr>
                                        <th>Componente</th>
                                        <th>Por porción (30g)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>Calorías</td><td>120 kcal</td></tr>
                                    <tr><td>Proteínas</td><td>24 g</td></tr>
                                    <tr><td>Grasas</td><td>1 g</td></tr>
                                    <tr><td>Carbohidratos</td><td>3 g</td></tr>
                                    <tr><td>Azúcares</td><td>1 g</td></tr>
                                    <tr><td>Sodio</td><td>50 mg</td></tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>

                    <div id="resenas" className="mt-5">
                        <h3 className="mb-3">Reseñas de clientes</h3>

                        <div className="mt-4 mb-4">
                            <h4>Valoración General</h4>
                            <div className="d-flex align-items-center">
                                <div className="rating me-2">
                                    <i className="bi bi-star-fill text-warning"></i>
                                    <i className="bi bi-star-fill text-warning"></i>
                                    <i className="bi bi-star-fill text-warning"></i>
                                    <i className="bi bi-star-fill text-warning"></i>
                                    <i className="bi bi-star-half text-warning"></i>
                                </div>
                                <span className="text-muted">(4.5/5 basado en 95 reseñas)</span>
                            </div>
                        </div>

                        <div className="card mb-3 shadow-sm border-0">
                            <div className="card-body">
                                <h5 className="card-title resena-titulo">Gran calidad</h5>
                                <div className="rating mb-2">
                                    <i className="bi bi-star-fill text-warning"></i>
                                    <i className="bi bi-star-fill text-warning"></i>
                                    <i className="bi bi-star-fill text-warning"></i>
                                    <i className="bi bi-star-fill text-warning"></i>
                                    <i className="bi bi-star text-muted"></i>
                                </div>
                                <p className="card-text">Muy buena proteína, me ayudó mucho en mi recuperación.</p>
                                <small className="text-muted">Carlos Martínez - hace 3 días</small>
                            </div>
                        </div>

                        <div className="card mb-3 shadow-sm border-0">
                            <div className="card-body">
                                <h5 className="card-title resena-titulo">Excelente sabor</h5>
                                <div className="rating mb-2">
                                    <i className="bi bi-star-fill text-warning"></i>
                                    <i className="bi bi-star-fill text-warning"></i>
                                    <i className="bi bi-star-fill text-warning"></i>
                                    <i className="bi bi-star-fill text-warning"></i>
                                    <i className="bi bi-star-fill text-warning"></i>
                                </div>
                                <p className="card-text">Sabor delicioso y se mezcla fácilmente.</p>
                                <small className="text-muted">Ana Gómez - hace 1 semana</small>
                            </div>
                        </div>

                        <div className="text-center mt-4">
                            <a href="/resenas" className="button button-lg">
                                <i className="bi bi-chat-left-text me-1"></i> Ver todas las reseñas
                            </a>
                        </div>
                    </div>
                </Container>
            </main>
        </>
    );
}

export default ProductoIndividual2;
