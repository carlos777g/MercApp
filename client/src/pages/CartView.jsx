import React from 'react';
import { useCartContext } from '../context/CartContext';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './CartView.css';

export default function CartView() {
  const { carrito, removeFromCart, clearCart } = useCartContext();
  const navigate = useNavigate();

  const total = carrito.reduce((acc, producto) => {
    const precio = parseFloat(producto.precio || producto.price || 0);
    return acc + precio;
  }, 0);

  const handleVaciarCarrito = () => {
    if (confirm('¿Estás seguro de vaciar el carrito?')) {
      clearCart();
    }
  };

  const handleComprarAhora = () => {
    navigate('/checkout');
  };

  return (
    <div className="container py-5 text-black">
      <h2 className="border-bottom pb-2">Carrito</h2>

      {carrito.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <div className="row g-4 py-3">
            {carrito.map((producto, index) => (
              <div className="col-12 col-sm-6 col-md-4" key={index}>
                <div className="cart-card">
                  <img src={producto.image} alt={producto.name} className="cart-img" />
                  <div className="cart-body">
                    <div>
                      <h5 className="cart-title">{producto.name}</h5>
                      <p className="cart-price">${producto.precio || producto.price}</p>
                    </div>
                    <button
                      className="btn btn-danger mt-3"
                      onClick={() => removeFromCart(producto.id)}
                    >
                      <FaTrash className="me-1" /> Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-end fs-4 fw-bold mb-4">
            Total a pagar: ${total.toFixed(2)}
          </div>

          <div className="cart-actions">
            <button className="btn btn-outline-danger" onClick={handleVaciarCarrito}>
              Vaciar carrito 🗑️
            </button>
            <button className="btn btn-success" onClick={handleComprarAhora}>
              Comprar ahora 💳
            </button>
          </div>
        </>
      )}
    </div>
  );
}
