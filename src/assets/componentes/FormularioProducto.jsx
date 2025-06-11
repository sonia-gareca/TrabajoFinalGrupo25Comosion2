/// aqui va componente funcional para crear un nuevo producto o editar uno existente
import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductoContext } from '../context/ProductoContext.jsx';
import { Form, Button, Container } from 'react-bootstrap';

const FormularioProducto = () => {
  const { productos, agregarProducto, editarProducto } = useContext(ProductoContext);
  const { id } = useParams(); // Si hay ID, es edición
  const navigate = useNavigate();

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
    if (id) {
      editarProducto(formulario);
    } else {
      agregarProducto(formulario);
    }
    navigate('/'); // Redirigir al Home
  };

  return (
    <Container className="mt-4">
      <h2>{id ? 'Editar Producto' : 'Crear Producto'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formulario.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={formulario.price}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={formulario.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Categoría</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={formulario.category}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>URL de la Imagen</Form.Label>
          <Form.Control
            type="text"
            name="image"
            value={formulario.image}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          {id ? 'Actualizar' : 'Crear'}
        </Button>
      </Form>
    </Container>
  );
};

export default FormularioProducto;