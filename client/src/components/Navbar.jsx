// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useFavContext } from '../context/FavContext';
import { useCartContext } from '../context/CartContext';

const Navbar = () => {
  const { favoritos } = useFavContext();
  const { carrito } = useCartContext();

  return (
    <header className="p-3 text-bg-dark">
      <div className="container">
        <div className="d-flex justify-content-end align-items-center gap-3">
          <Link to="/" className="btn btn-outline-light">🏠</Link>
          <Link to="/cliente" className="btn btn-outline-light">📦</Link>
          <Link to="/favoritos" className="btn btn-outline-light position-relative">
            🤍
            {favoritos.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {favoritos.length}
              </span>
            )}
          </Link>
          <Link to="/carrito" className="btn btn-outline-light position-relative">
            🛒
            {carrito.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                {carrito.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
