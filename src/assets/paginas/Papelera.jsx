import { useContext } from 'react';
import { ProductoContext } from '../context/ProductoContext';
import { UsuarioContext } from '../context/UsuarioContext';
import { Card, Button, Container, Alert } from 'react-bootstrap';

const Papelera = () => {
  const { productos, restaurarProducto } = useContext(ProductoContext);
  const { usuarioActual } = useContext(UsuarioContext);

  // Verifica si el usuario actual es el administrador
  if (usuarioActual !== 'admin') {
    return (
      <Container className="mt-4">
        <Alert variant="danger">
          Acceso denegado. Solo el administrador puede ver la papelera.
        </Alert>
      </Container>
    );
  }

  // Filtrar los productos eliminados
  const productosEliminados = productos.filter(p => p.eliminado);

  return (
    <Container className="mt-4">
      <h2>Papelera de productos eliminados</h2>
      {productosEliminados.length === 0 ? (
        <Alert variant="info">No hay productos en la papelera.</Alert>
      ) : (
        <div className="d-flex flex-wrap justify-content-center">
          {productosEliminados.map(producto => (
            <Card key={producto.id} className="m-2" style={{ width: '18rem' }}>
              <Card.Img variant="top" src={producto.image} style={{ height: '200px' }} />
              <Card.Body>
                <Card.Title>{producto.title}</Card.Title>
                <Card.Text>{producto.price} USD</Card.Text>
                <Button
                  variant="success"
                  onClick={() => restaurarProducto(producto.id)}
                >
                  Restaurar
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
};

export default Papelera;
