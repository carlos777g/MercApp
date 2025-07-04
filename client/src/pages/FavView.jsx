import React from 'react';
import { useFavContext } from '../context/FavContext';
import { useCartContext } from '../context/CartContext';
import { FaCartPlus, FaHeartBroken } from 'react-icons/fa';
import './CartView.css';

export default function FavView() {
  const { favoritos, removeFromFav, clearFav } = useFavContext();
  const { carrito, setCarrito } = useCartContext();

  const handleVaciarFavoritos = () => {
    if (window.confirm('¿Seguro que quieres vaciar tus favoritos?')) {
      clearFav();
      localStorage.setItem('favoritos', JSON.stringify([]));
    }
  };

  const handleAgregarTodoAlCarrito = () => {
    if (favoritos.length === 0) {
      alert('No tienes productos en favoritos.');
      return;
    }

    const nuevosProductos = favoritos.filter(
      (fav) => !carrito.some((prod) => prod.id === fav.id)
    );

    const actualizado = [...carrito, ...nuevosProductos];
    setCarrito(actualizado);
    localStorage.setItem('carrito', JSON.stringify(actualizado));

    alert(`${nuevosProductos.length} producto(s) agregado(s) al carrito 🛒`);
  };

  return (
    <div className="container py-5 text-black">
      <h2 className="border-bottom pb-2">Favoritos</h2>

      {favoritos.length === 0 ? (
        <p>No tienes productos favoritos.</p>
      ) : (
        <>
          <div className="row g-4 py-3">
            {favoritos.map((producto, index) => (
              <div className="col-12 col-sm-6 col-md-4" key={index}>
                <div className="cart-card">
                  <img src={producto.image} alt={producto.name} className="cart-img" />
                  <div className="cart-body">
                    <div>
                      <h5 className="cart-title">{producto.name}</h5>
                      <p className="cart-price">${producto.price || producto.precio}</p>
                    </div>
                    <button
                      className="btn btn-outline-danger mt-3"
                      onClick={() => {
                        removeFromFav(producto.id);
                        const actualizados = favoritos.filter((p) => p.id !== producto.id);
                        localStorage.setItem('favoritos', JSON.stringify(actualizados));
                      }}
                    >
                      <FaHeartBroken className="me-1" /> Quitar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-actions">
            <button className="btn btn-success" onClick={handleAgregarTodoAlCarrito}>
              Agregar todo al carrito 🛒
            </button>
            <button className="btn btn-outline-danger" onClick={handleVaciarFavoritos}>
              Vaciar favoritos 💔
            </button>
          </div>
        </>
      )}
    </div>
  );
}
