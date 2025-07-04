import { Outlet, useLocation } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';

export default function Layout() {
  const location = useLocation();

  const ocultarFooter = ['/login', '/registro'].includes(location.pathname);
  const ocultarNavbar = ocultarFooter; // 👈 misma lógica

  return (
    <div className="d-flex flex-column min-vh-100">
      {!ocultarNavbar && <Navbar />}
      <main className="flex-grow-1">
        <Outlet />
      </main>
      {!ocultarFooter && <Footer />}
    </div>
  );
}
