/// aqui va componente funcional para crear un nuevo producto o editar uno existente
import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductoContext } from '../context/ProductoContext.jsx';
import { Form, Button, Container, Alert, Row, Col } from 'react-bootstrap';
import { validarProducto } from '../hooks/useValidacionProducto.js';
import '../css/formulario.css';

const FormularioProducto = () => {
  const { productos, agregarProducto, editarProducto } = useContext(ProductoContext);
  const { id } = useParams(); // Si hay ID, es edición
  const navigate = useNavigate();

  const [error, setError] = useState(''); // Estado para manejar errores de validación

  // Estado local del formulario
  const [formulario, setFormulario] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
    stock: 10, // stock fijo si no lo incluye la API
  });

  // Si estamos editando, precargar el formulario con los datos del producto
  useEffect(() => {
    if (id) {
      const producto = productos.find(p => p.id === parseInt(id));
      if (producto) {
        setFormulario(producto);
      }
    }
  }, [id, productos]);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  // Enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    const mensajeError = validarProducto(formulario);
    if (mensajeError) {
      setError(mensajeError); // Mostrar error
      return;
    }

    if (id) {
      editarProducto(formulario);
    } else {
      agregarProducto(formulario);
    }
    navigate('/'); // Redirigir al Home
  };

  const navigatet = useNavigate();

  const handleCancelar = () => {
    navigatet('/'); // O la ruta que prefieras
  };

  return (
    <Container className="formulario-container mt-4">
      <h2>{id ? 'Editar Producto' : 'Crear Producto'}</h2>

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
          value={formulario.stock}
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
     <Button variant="dark" type="submit" className="me-2">
          {id ? 'Actualizar' : 'Crear'}
        </Button>

        <Button variant="secondary" onClick={handleCancelar}>
          Cancelar
        </Button>
</div>
        
      </Form>
    </Container>
  );
};

export default FormularioProducto;