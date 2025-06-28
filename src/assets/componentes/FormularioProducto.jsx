// aqui va componente funcional para crear un nuevo producto o editar uno existente
import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ProductoContext } from '../context/ProductoContext.jsx';
import { AutorizarContext } from '../context/AurorizacionesContex.jsx';
import { Form, Button, Container, Alert, Row, Col } from 'react-bootstrap';
import { validarProducto } from '../hooks/useValidacionProducto.js';
import '../css/formulario.css';

const FormularioProducto = () => {
  // Obtiene el usuario actual del contexto de usuario
  const { usuarioActual } = useContext(AutorizarContext);
  // Obtiene funciones y productos del contexto de productos
  const { productos, agregarProducto, editarProducto, eliminarProducto } = useContext(ProductoContext);
  // Hook para navegar entre rutas
  const navigate = useNavigate();
  // Obtiene el parámetro id de la URL (si existe)
  const { id } = useParams();

  // Estado para los valores del formulario
  const [formulario, setFormulario] = useState({
    id: null,
    title: '',
    price: '',
    description: '',
    image: '',
    category: ''
  });

  // Estado para mostrar mensajes de error
  const [error, setError] = useState('');
  // Estado para saber si estamos en modo edición
  const [modoEdicion, setModoEdicion] = useState(false);

  // Al montar el componente, si hay ID, precarga el producto
  useEffect(() => {
    if (id) {
      // Busca el producto a editar por su id
      const productoEncontrado = productos.find(p => p.id === parseInt(id));
      if (productoEncontrado) {
        setFormulario(productoEncontrado);
        setModoEdicion(true);
      } else {
        setError('Producto no encontrado.');
      }
    }
  }, [id, productos]);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  // Enviar el formulario (crear o editar producto)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Valida los datos del formulario
    const mensaje = validarProducto(formulario);
    if (mensaje) {
      setError(mensaje);
      return;
    }

    // Validar que no haya productos repetidos por título
    const tituloIngresado = formulario.title.trim().toLowerCase();
    const productoRepetido = productos.find(
      p =>
        p.title.trim().toLowerCase() === tituloIngresado &&
        (!modoEdicion || p.id !== formulario.id)
    );
    if (productoRepetido) {
      setError('Ya existe un producto con ese nombre.');
      return;
    }

    // Si estamos editando, actualiza el producto
    if (modoEdicion) {
      editarProducto(formulario);
    } else {
      // Si estamos creando, genera un nuevo id y agrega el producto
      const nuevoId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;
      agregarProducto({ ...formulario, id: nuevoId });
    }

    // Redirige al home después de guardar
    navigate('/');
  };

  // Botón para cancelar y volver al Home
  const handleCancelar = () => {
    navigate('/');
  };

  // Botón para eliminar producto (solo si hay id)
  const handleEliminar = () => {
    if (id && window.confirm('¿Estás seguro de eliminar este producto?')) {
      eliminarProducto(parseInt(id));
      navigate('/');
    }
  };

  // Si no es admin, no muestra el formulario
  if (usuarioActual?.rol !== 'admin') return null;

  return (
    <Container className="formulario-container mt-4">
      <h2>{modoEdicion ? 'Editar Producto' : 'Crear Producto'}</h2>

      {/* Mostrar el mensaje de error si existe */}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Row className="formulario-fila">
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formulario.title}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formulario.price}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={formulario.category}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                value={formulario.stock || 0}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col md={12}>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formulario.description}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col md={12}>
            <Form.Group className="mb-3">
              <Form.Label>URL de la Imagen</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={formulario.image}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Botones de acción */}
        <div className="mt-4">
          {/* Botón para crear o actualizar producto */}
          <Button variant="dark" type="submit" className="me-2">
            {modoEdicion ? 'Actualizar' : 'Crear'}
          </Button>

          {/* Botón para cancelar y volver al home */}
          <Button variant="secondary" onClick={handleCancelar} className="me-2">
            Cancelar
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default FormularioProducto;
