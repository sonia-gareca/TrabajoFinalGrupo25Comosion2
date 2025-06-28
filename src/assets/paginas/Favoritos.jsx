import { useContext } from 'react';
import { ProductoContext } from '../context/ProductoContext';
import CardProducto from '../componentes/CardProducto';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Favoritos = () => {
  const { productos, favoritos } = useContext(ProductoContext);

  // Filtra solo los productos favoritos no eliminados
  const productosFavoritos = productos.filter(
    p => favoritos.includes(p.id) && !p.eliminado
  );

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">💖 Mis Favoritos</h2>

      {productosFavoritos.length > 0 ? (
        <Row>
          {productosFavoritos.map(producto => (
            <Col key={producto.id} md={4}>
              <CardProducto producto={producto} modo="favoritos" />
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center mt-5">
          {/* Ícono grande */}
          <div style={{ fontSize: '5rem', color: '#ccc' }}>🤍</div>
          {/* Mensaje amigable */}
          <h4 className="mt-3">Aún no tienes productos favoritos</h4>
          <p className="text-muted">¡Explora la tienda y agrega algunos!</p>
          {/* Botón para volver al home */}
          <Link to="/">
            <Button variant="primary" className="mt-3">
              Ir al inicio
            </Button>
          </Link>
        </div>
      )}
    </Container>
  );
};

export default Favoritos;
