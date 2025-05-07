import { useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import styles from "./Carrusel.module.css";

const items = Array.from({ length: 10 }, () => ``);

export const Carrusel = () => {
  // Estados
  const [startIndex, setStartIndex] = useState(0);

  // Variables
  const visibleCount = 4;
  const visibleItems = items.slice(startIndex, startIndex + visibleCount);

  // Funciones de accion
  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleNext = () => {
    if (startIndex + visibleCount < items.length) {
      setStartIndex(startIndex + 1);
    }
  };

  return (
    <Container className={styles.componentCarrusel}>
      <Button
        variant="outline-secondary"
        onClick={handlePrev}
        disabled={startIndex === 0}
      >
        <i className="bi bi-caret-left-fill" style={{ color: "#1F1F1F" }}></i>
      </Button>

      <Row className={styles.row} style={{ width: "100%" }}>
        {visibleItems.map((item, idx) => (
          <Col className={styles.col} key={idx} xs={3}>
            <Card>
              <Card.Body className={styles.cardBody}>{item}</Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Button
        variant="outline-secondary"
        onClick={handleNext}
        disabled={startIndex + visibleCount >= items.length}
      >
        <i className="bi bi-caret-right-fill" style={{ color: "#1F1F1F" }}></i>
      </Button>
    </Container>
  );
};
