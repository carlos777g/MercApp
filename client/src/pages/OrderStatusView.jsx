// src/pages/OrderStatusView.jsx
import React, { useEffect, useState } from 'react';

export default function OrderStatusView() {
  const [pedido, setPedido] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("pedidoCliente");
    if (stored) {
      setPedido(JSON.parse(stored));
    }
  }, []);

  if (!pedido) {
    return (
      <div className="container py-5 text-black">
        <h2 className="border-bottom pb-2">Estatus de pedido</h2>
        <p>No tienes pedidos recientes.</p>
      </div>
    );
  }

  return (
    <div className="container py-5 text-black">
      <h2 className="border-bottom pb-3">🛍️ Estatus de tu pedido</h2>

      <h5 className="mt-4">📦 Productos:</h5>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {pedido.productos.map((prod, index) => (
          <div className="col" key={index}>
            <div className="card h-100">
              {prod.image && (
                <img src={prod.image} alt={prod.name} className="card-img-top" style={{ height: '180px', objectFit: 'cover' }} />
              )}
              <div className="card-body">
                <h5 className="card-title">{prod.name}</h5>
                <p className="card-text">Precio: ${prod.precio}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h5 className="mt-4">📍 Dirección de envío:</h5>
      <ul>
        <li><strong>Calle:</strong> {pedido.direccion.calle}</li>
        <li><strong>Ciudad:</strong> {pedido.direccion.ciudad}</li>
        <li><strong>Estado:</strong> {pedido.direccion.estado}</li>
        <li><strong>Código Postal:</strong> {pedido.direccion.cod_postal}</li>
        <li><strong>País:</strong> {pedido.direccion.pais}</li>
      </ul>

      <h5 className="mt-4">🚚 Estatus del pedido:</h5>
      <p><strong>{pedido.estatus}</strong></p>

      <h5 className="mt-2">📅 Fecha estimada de entrega:</h5>
      <p><strong>{pedido.fechaEntrega}</strong></p>
    </div>
  );
}
