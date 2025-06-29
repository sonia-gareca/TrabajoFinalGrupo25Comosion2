// src/assets/paginas/AcercaDe.jsx
import { Card, Row, Col, Container } from "react-bootstrap";
import "../css/acercaDe.css";

import soniaImg from "../imagenes/sonia.jpeg";
import antonioImg from "../imagenes/antonio.jpeg";
import angeloImg from "../imagenes/angelo.jpeg";
import joaquinImg from "../imagenes/joaquin.jpeg";

const AcercaDe = () => {
  const desarrolladores = [
    {
      name: "Sonia Gareca",
      rol: "Desarrolladora Frontend",
      img: soniaImg,
    },
    {
      name: "Antonio Almada",
      rol: "Desarrollador Backend / Lógica",
      img: antonioImg,
    },
    {
      name: "Angelo Quiroga",
      rol: "Diseño UX/UI / Frontend",
      img: angeloImg,
    },
    {
      name: "Joaquín Calermo",
      rol: "Gestión de Datos / Documentación",
      img: joaquinImg,
    },
  ];

  return (
    <Container className="acerca-de-container">
      <h1>Acerca de ClickZone</h1>
      <p className="descripcion-proyecto">
        Bienvenido a ClickZone, tu tienda online de referencia para ropa casual y
        de temporada. Nos dedicamos a ofrecerte las últimas tendencias y los
        estilos más cómodos para cada estación, garantizando calidad y variedad
        en todas nuestras prendas. En ClickZone, encontrar el atuendo perfecto
        para cada ocasión es fácil, rápido y divertido. ¡Explora nuestras
        colecciones y renueva tu guardarropa con solo un clic!
      </p>

      <div className="tecnologias-usadas">
        <h2>Tecnologías Utilizadas</h2>
        <ul>
          <li>Frontend: React.js (con Hooks como useState, useMemo, useCallback)</li>
          <li>Estilos: Bootstrap</li>
          <li>Lenguaje: JavaScript</li>
          <li>Control de Versiones: Git & GitHub</li>
        </ul>
      </div>

      <div className="equipo-desarrollo">
        <h2>Nuestro Equipo de Desarrollo</h2>
        <Row className="g-4">
          {desarrolladores.map((dev, index) => (
            <Col key={index} xs={12} sm={6} md={3}>
              <Card className="h-100 text-center shadow-sm">
                <Card.Img
                  variant="top"
                  src={dev.img}
                  alt={dev.name}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{dev.name}</Card.Title>
                  <Card.Text>{dev.rol}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <div className="contacto">
        <h2>Contacto</h2>
        <p>
          Para cualquier consulta o sugerencia sobre el sistema, no duden en
          contactarnos.
        </p>
        <p>¡Gracias por usar nuestra aplicación!</p>
      </div>
    </Container>
  );
};

export default AcercaDe;
