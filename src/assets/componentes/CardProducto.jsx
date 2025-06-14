//CREACION DE CARDS DE PRODUCTOS
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ProductoContext } from '../context/ProductoContext';


const CardProducto = ({ producto }) => {
  const { toggleFavorito, favoritos } = useContext(ProductoContext);

  // Verifica si el producto ya es favorito
  const esFavorito = favoritos.includes(producto.id);


  return (
    <Card className="m-2" style={{ width: '18rem' }}>
      
      {/* Imagen del producto */}
      <Card.Img variant="top" src={producto.image} style={{ height: '200px' }} />
      <Card.Body>
        
        {/* Título y precio */}
        <Card.Title>{producto.title}</Card.Title>
        <Card.Text>{producto.price} USD</Card.Text>

        {/* Botón que lleva a la página de detalle */}
        <Link to={`/producto/${producto.id}` }>
          <Button variant='dark' className="me-2">Ver más</Button>
        </Link>
       
        {/* Botón para marcar/desmarcar como favorito */}
        <Button variant={esFavorito ? 'danger' : 'outline-danger'} onClick={() => toggleFavorito(producto.id)}>
          {esFavorito ? '❤' : '🤍'}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CardProducto;