// Creamos el menu de navegacion
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UsuarioContext } from '../context/UsuarioContext.jsx';

const Menu = () => {
  const { usuarioActual, setUsuarioActual } = useContext(UsuarioContext);
  const navigate = useNavigate();

  const cerrarSesion = () => {
    setUsuarioActual(null);        // limpia sesión
    navigate('/login');            // redirige a login
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Tienda Grupo 25</Navbar.Brand>
        <Navbar.Toggle aria-controls="menu-principal" />
        <Navbar.Collapse id="menu-principal">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            {usuarioActual && (
              <Nav.Link as={Link} to="/favoritos">Favoritos</Nav.Link>
            )}
            {usuarioActual === 'admin' && (
              <Nav.Link as={Link} to="/crear">Crear Producto</Nav.Link>
            )}
            <Nav.Link as={Link} to="/acerca-de">Acerca de</Nav.Link>
          </Nav>
            
          {/* Info de usuario logueado y botón de cierre */}
          {usuarioActual && (
            <div className="d-flex align-items-center">
              <span className="text-light me-3">
                Rol: <strong>{usuarioActual}</strong>
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
