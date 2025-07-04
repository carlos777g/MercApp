import { createContext, useState, useEffect, useContext } from 'react';

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(() => {
    const stored = localStorage.getItem('carrito');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const addToCart = (producto) => {
    const exists = carrito.find((p) => p.id === producto.id);
    if (!exists) {
      setCarrito([...carrito, producto]);
    }
  };

  const removeFromCart = (id) => {
    setCarrito(carrito.filter((p) => p.id !== id));
  };

  const clearCart = () => {
    setCarrito([]);
  };

  return (
    <CarritoContext.Provider
      value={{ carrito, setCarrito, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

export const useCartContext = () => useContext(CarritoContext);
