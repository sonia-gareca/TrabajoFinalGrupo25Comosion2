
// Creamos el menu de navegacion
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AutorizarContext } from '../context/AurorizacionesContex.jsx';

const Menu = () => {
  const { usuarioActual, setUsuarioActual } = useContext(AutorizarContext);
  const navigate = useNavigate();

  // Cierra sesión y redirige al Home
  const cerrarSesion = () => {
    setUsuarioActual(null);
    navigate('/');
  };

  // Redirige a la página de login
  const irALogin = () => navigate('/login');

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Tienda ClickZone</Navbar.Brand>
        <Navbar.Toggle aria-controls="menu-principal" />
        <Navbar.Collapse id="menu-principal">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            {usuarioActual && (
              <Nav.Link as={Link} to="/favoritos">Favoritos</Nav.Link>
            )}
            {usuarioActual?.rol === 'admin' && (
              <>
                <Nav.Link as={Link} to="/crear">Crear Producto</Nav.Link>
                <Nav.Link as={Link} to="/papelera">Papelera</Nav.Link>
              </>
            )}
          </Nav>
          {/* Si NO hay usuario logueado, muestra botón de iniciar sesión */}
          {!usuarioActual && (
            <Button variant="outline-light" size="sm" onClick={irALogin}>
              Iniciar sesión
            </Button>
          )}
          {/* Info de usuario logueado y botón de cierre */}
          {usuarioActual && (
            <div className="d-flex align-items-center">
              <span className="text-light me-3">
                Rol: <strong>{usuarioActual?.rol}</strong>
              </span>
              <Button variant="outline-light" size="sm" onClick={cerrarSesion}>
                Cerrar sesión
              </Button>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;