// src/context/FavContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const FavContext = createContext();

export const FavProvider = ({ children }) => {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const favStorage = localStorage.getItem('favoritos');
    if (favStorage) {
      setFavoritos(JSON.parse(favStorage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  }, [favoritos]);

  const addToFav = (producto) => {
    if (!favoritos.some((p) => p.id === producto.id)) {
      setFavoritos([...favoritos, producto]);
    }
  };

  const removeFromFav = (id) => {
    setFavoritos(favoritos.filter((p) => p.id !== id));
  };

  const clearFav = () => {
    setFavoritos([]);
  };

  return (
    <FavContext.Provider value={{ favoritos, addToFav, removeFromFav, clearFav, setFavoritos }}>
      {children}
    </FavContext.Provider>
  );
};


export const useFavContext = () => useContext(FavContext);
