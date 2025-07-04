import React, { useState } from 'react';

export default function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    imagen: ''
  });

  const handleAgregar = () => {
    if (!nuevoProducto.nombre || !nuevoProducto.precio) {
      alert('Faltan campos obligatorios');
      return;
    }

    const nuevo = { ...nuevoProducto, id: Date.now() };
    setProductos([...productos, nuevo]);
    setNuevoProducto({
      nombre: '',
      descripcion: '',
      precio: '',
      stock: '',
      imagen: ''
    });
  };

  const handleEliminar = (id) => {
    const confirm = window.confirm('¿Estás seguro de eliminar este producto?');
    if (confirm) {
      setProductos(productos.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="container py-5 text-black">
      <h2 className="border-bottom pb-3">Gestión de Productos 🛍️</h2>

      <div className="mb-4">
        <h5>Agregar nuevo producto</h5>
        <input
          className="form-control mb-2"
          placeholder="Nombre"
          value={nuevoProducto.nombre}
          onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
        />
        <textarea
          className="form-control mb-2"
          placeholder="Descripción"
          style={{
            color: '#ffffff',
            backgroundColor: '#343a40',
            border: '1px solid #ced4da',
            padding: '10px',
            borderRadius: '4px'
          }}
          value={nuevoProducto.descripcion}
          onChange={(e) => setNuevoProducto({ ...nuevoProducto, descripcion: e.target.value })}
        />
        <input
          className="form-control mb-2"
          placeholder="Precio"
          type="number"
          value={nuevoProducto.precio}
          onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: e.target.value })}
        />
        <input
          className="form-control mb-2"
          placeholder="Stock"
          type="number"
          value={nuevoProducto.stock}
          onChange={(e) => setNuevoProducto({ ...nuevoProducto, stock: e.target.value })}
        />
        <input
          className="form-control mb-2"
          placeholder="URL Imagen"
          value={nuevoProducto.imagen}
          onChange={(e) => setNuevoProducto({ ...nuevoProducto, imagen: e.target.value })}
        />
        <button className="btn btn-success" onClick={handleAgregar}>
          Agregar producto ✅
        </button>
      </div>

      <hr />

      <h5>Productos registrados:</h5>
      {productos.length === 0 ? (
        <p>No hay productos aún.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {productos.map((prod) => (
            <div className="col" key={prod.id}>
              <div className="card h-100">
                {prod.imagen && (
                  <img
                    src={prod.imagen}
                    alt={prod.nombre}
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{prod.nombre}</h5>
                  <p className="card-text">{prod.descripcion}</p>
                  <p className="card-text">Precio: ${prod.precio}</p>
                  <p className="card-text">Stock: {prod.stock}</p>
                  <button className="btn btn-danger" onClick={() => handleEliminar(prod.id)}>
                    Eliminar ❌
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
