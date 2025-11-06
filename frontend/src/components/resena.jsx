import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const initialReviews = [
  {
    id: 1,
    title: "Excelente Producto",
    rating: 4,
    text: "Excelente proteína, se disuelve bien y sabe rico.",
    author: "Juan Pérez",
    date: "hace 2 días",
  },
  {
    id: 2,
    title: "Buen sabor",
    rating: 5,
    text: "Muy buena calidad y precio competitivo.",
    author: "María López",
    date: "hace 5 días",
  },
];

const Resenas = () => {
  const [reviews, setReviews] = useState(initialReviews);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);

  const handleStar = (value) => setRating(value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !text.trim() || rating === 0) return;
    const nueva = {
      id: Date.now(),
      title: title.trim(),
      rating,
      text: text.trim(),
      author: "Usuario",
      date: "hace unos segundos",
    };
    setReviews([nueva, ...reviews]);
    setTitle("");
    setText("");
    setRating(0);
  };

  const renderStars = (value, size = "1rem") =>
    [1, 2, 3, 4, 5].map((s) => (
      <i
        key={s}
        className={s <= value ? "bi bi-star-fill text-warning" : "bi bi-star text-muted"}
        style={{ fontSize: size, marginRight: "0.15rem" }}
        aria-hidden
      />
    ));

  return (
    <>
      <main>
        <Container className="my-5">
          <Row>
            <Col>
              <h1 className="mb-4 text-center">Reseñas del Producto</h1>
            </Col>
          </Row>

          <Row>
            <Col md={8}>
              <section id="reviews">
                {reviews.map((r) => (
                  <div className="card mb-3 product-card" key={r.id}>
                    <div className="card-body">
                      <h5 className="card-title">{r.title}</h5>
                      <div className="rating mb-3">{renderStars(r.rating, "1.1rem")}</div>
                      <p className="card-text">{r.text}</p>
                      <footer className="blockquote-footer">
                        {r.author} <cite title="Source Title">{r.date}</cite>
                      </footer>
                    </div>
                  </div>
                ))}
              </section>
            </Col>

            <Col md={4}>
              <section id="add-review" className="p-3 border rounded">
                <h5 className="mb-3 text-center">Deja tu Reseña</h5>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="reviewTitle">
                    <Form.Label>Título de la Reseña</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ej. Producto increíble!"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Calificación</Form.Label>
                    <div className="d-flex align-items-center" role="radiogroup" aria-label="Calificación">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Button
                          key={s}
                          variant="link"
                          className="p-0 me-2"
                          onClick={() => handleStar(s)}
                          aria-pressed={rating === s}
                          title={`${s} estrella${s > 1 ? "s" : ""}`}
                          style={{ textDecoration: "none" }}
                        >
                          <i className={s <= rating ? "bi bi-star-fill text-warning" : "bi bi-star text-muted"} style={{ fontSize: "1.25rem" }} />
                        </Button>
                      ))}
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="reviewText">
                    <Form.Label>Comentario</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Escribe tu reseña..."
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Button type="submit" className="w-100 button">
                    <i className="bi bi-send me-1" /> Enviar Reseña
                  </Button>
                </Form>
              </section>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
};

export default Resenas;