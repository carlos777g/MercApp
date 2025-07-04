import { Link } from 'react-router-dom';
import { useFavContext } from '../context/FavContext';
import { useCartContext } from '../context/CartContext';

const NavbarCliente = () => {
  const { favoritos } = useFavContext();
  const { carrito } = useCartContext();

  return (
    <header className="p-3 text-bg-dark">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-between">
          <Link to="/" className="d-flex align-items-center text-white text-decoration-none">
            <img src="/images/logo.svg" alt="Logo" width="40" height="32" className="me-2" />
            <span className="fs-4 fw-bold">UpiitaStore</span>
          </Link>

          <div className="text-end d-flex gap-3">
            <Link to="/cliente/favoritos" className="btn btn-outline-danger position-relative">
              ❤️
              {favoritos.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {favoritos.length}
                </span>
              )}
            </Link>

            <Link to="/cliente/carrito" className="btn btn-outline-success position-relative">
              🛒
              {carrito.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                  {carrito.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavbarCliente;
