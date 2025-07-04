import React, { useEffect, useState } from 'react';

export default function AdminComentarios() {
  const [comentarios, setComentarios] = useState([]);

  // Simulación de carga de reseñas desde localStorage (o podrías usar una API en el futuro)
  useEffect(() => {
    const storedReviews = JSON.parse(localStorage.getItem('reseñas')) || [];
    setComentarios(storedReviews);
  }, []);

  return (
    <div className="container py-5 text-black">
      <h2 className="border-bottom pb-3">Comentarios y Calificaciones 💬</h2>

      {comentarios.length === 0 ? (
        <p>No hay comentarios disponibles.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {comentarios.map((item, index) => (
            <div className="col" key={index}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Producto: {item.nombre}</h5>
                  <p><strong>Calificación:</strong> {item.calificacion} ⭐</p>
                  <p><strong>Comentario:</strong> {item.comentario}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
