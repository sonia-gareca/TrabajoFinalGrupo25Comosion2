// CREACIÓN DE CARDS DE PRODUCTOS
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ProductoContext } from '../context/ProductoContext';
import { UsuarioContext } from '../context/UsuarioContext';

const CardProducto = ({ producto }) => {
  const { toggleFavorito, favoritos } = useContext(ProductoContext);
  const { usuarioActual } = useContext(UsuarioContext);

  // Verifica si el producto ya está marcado como favorito
  const esFavorito = favoritos.includes(producto.id);

  return (
    <Card className="m-2" style={{ width: '18rem' }}>
      {/* Imagen del producto */}
      <Card.Img variant="top" src={producto.image} style={{ height: '200px', objectFit: 'contain' }} />
      <Card.Body>
        {/* Título y precio */}
        <Card.Title>{producto.title}</Card.Title>
        <Card.Text>{producto.price} USD</Card.Text>

        {/* Botones condicionales según el usuario */}
        <div className="d-flex justify-content-between align-items-center">

          {/* Botón EDITAR solo visible para ADMIN */}
          {usuarioActual === 'admin' && (
            <Link to={`/editar/${producto.id}`}>
              <Button variant="warning" className="me-2">Editar</Button>
            </Link>
          )}

          {/* Botón VER MÁS visible para todos */}
          <Link to={`/producto/${producto.id}`}>
            <Button variant="info" className="me-2">Ver más</Button>
          </Link>

          {/* Botón para agregar o quitar favoritos */}
          <Button
            variant={esFavorito ? 'danger' : 'outline-danger'}
            onClick={() => toggleFavorito(producto.id)}
          >
            {esFavorito ? '❤' : '🤍'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardProducto;
