import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ReviewView.css';

export default function ReviewView() {
  const { state } = useLocation();
  const productos = state?.productos || [];
  const navigate = useNavigate();

  const [calificaciones, setCalificaciones] = useState(
    productos.map(() => ({ calificacion: '', comentario: '' }))
  );

  const handleChange = (index, field, value) => {
    const updated = [...calificaciones];
    updated[index][field] = value;
    setCalificaciones(updated);
  };

  const handleEnviar = () => {
    if (calificaciones.some(item => item.calificacion === '')) {
      alert("Por favor califica todos los productos.");
      return;
    }

    // Obtener reseñas anteriores
    const reseñasGuardadas = JSON.parse(localStorage.getItem('reseñas')) || [];

    // Agregar nuevas reseñas
    const nuevasReseñas = productos.map((producto, index) => ({
      nombre: producto.name,
      calificacion: calificaciones[index].calificacion,
      comentario: calificaciones[index].comentario
    }));

    localStorage.setItem('reseñas', JSON.stringify([...reseñasGuardadas, ...nuevasReseñas]));

    alert("¡Gracias por tu reseña!");
    navigate('/cliente');
  };

  return (
    <div className="container py-5 text-black">
      <h2 className="border-bottom pb-2">Califica tus productos</h2>

      {productos.length === 0 ? (
        <p>No hay productos para calificar.</p>
      ) : (
        <div className="row row-cols-1 g-4">
          {productos.map((producto, index) => (
            <div className="col" key={index}>
              <div className="card review-card d-flex flex-row align-items-start p-3">
                <img
                  src={producto.image}
                  alt={producto.name}
                  style={{
                    width: '150px',
                    height: '150px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    marginRight: '1rem'
                  }}
                />
                <div className="flex-grow-1">
                  <h5 className="card-title">{producto.name}</h5>
                  <label className="form-label">Calificación (1 a 5)</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    className="form-control mb-2"
                    value={calificaciones[index].calificacion}
                    onChange={(e) =>
                      handleChange(index, 'calificacion', e.target.value)
                    }
                  />
                  <label className="form-label">Comentario</label>
                  <textarea
                    className="form-control"
                    rows="2"
                    value={calificaciones[index].comentario}
                    onChange={(e) =>
                      handleChange(index, 'comentario', e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {productos.length > 0 && (
        <div className="text-end mt-4">
          <button className="btn btn-primary" onClick={handleEnviar}>
            Enviar calificaciones ✍️
          </button>
        </div>
      )}
    </div>
  );
}

