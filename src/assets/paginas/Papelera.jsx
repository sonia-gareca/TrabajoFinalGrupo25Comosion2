import { useContext } from 'react';
<<<<<<< HEAD
import { ProductoContext } from '../context/ProductoContext.jsx';
import { AutorizarContext } from '../context/AurorizacionesContex.jsx';
import { Card, Button, Container, Alert } from 'react-bootstrap';

const Papelera = () => {
  const { productos, editarProducto } = useContext(ProductoContext);
  const { usuarioActual } = useContext(AutorizarContext);

  // Verifica si el usuario actual es administrador
  if (!usuarioActual || usuarioActual.rol !== 'admin') {
    return (
      <Container className="mt-4">
        <Alert variant="danger">Acceso denegado. Solo administradores pueden acceder a la papelera.</Alert>
=======
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
>>>>>>> 5ce9d87d23f8798a72836ac590f8eebd4f84e029
      </Container>
    );
  }

<<<<<<< HEAD
  // Filtra los productos eliminados
  const productosEliminados = productos.filter(p => p.eliminado);

  // Función para restaurar producto
  const restaurarProducto = (id) => {
    const producto = productos.find(p => p.id === id);
    if (producto) {
      const productoRestaurado = { ...producto, eliminado: false };
      editarProducto(productoRestaurado);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Papelera de productos</h2>
=======
  // Filtrar los productos eliminados
  const productosEliminados = productos.filter(p => p.eliminado);

  return (
    <Container className="mt-4">
      <h2>Papelera de productos eliminados</h2>
>>>>>>> 5ce9d87d23f8798a72836ac590f8eebd4f84e029
      {productosEliminados.length === 0 ? (
        <Alert variant="info">No hay productos en la papelera.</Alert>
      ) : (
        <div className="d-flex flex-wrap justify-content-center">
          {productosEliminados.map(producto => (
            <Card key={producto.id} className="m-2" style={{ width: '18rem' }}>
<<<<<<< HEAD
              <Card.Img variant="top" src={producto.image} style={{ height: '200px', objectFit: 'contain' }} />
              <Card.Body>
                <Card.Title>{producto.title}</Card.Title>
                <Card.Text>{producto.price} USD</Card.Text>
                <Button variant="success" onClick={() => restaurarProducto(producto.id)}>Restaurar</Button>
=======
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
>>>>>>> 5ce9d87d23f8798a72836ac590f8eebd4f84e029
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
};

export default Papelera;
