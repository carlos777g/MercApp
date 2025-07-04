import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login.jsx';
import Registro from './pages/Registro.jsx';
import Client from './pages/Client';
import ProductView from './pages/ProductView';
import CartView from './pages/CartView';
import FavView from './pages/FavView';
import CheckoutView from './pages/CheckoutView';
import ReviewView from './pages/ReviewView';
import OrderStatusView from './pages/OrderStatusView';
import './App.css';

// Import Admin
import AdminPanel from './pages/admin/AdminPanel';
import AdminProductos from './pages/admin/AdminProductos';
import AdminAuxiliares from './pages/admin/AdminAuxiliares';
import AdminComentarios from './pages/admin/AdminComentarios';
import NavbarAdmin from './components/NavbarAdmin';

function App() {

  return (

    <Routes>
      {/* Cliente - anidados en Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="registro" element={<Registro />} />
        <Route path="cliente" element={<Client />} />
        <Route path="cliente/favoritos" element={<FavView />} />
        <Route path="cliente/carrito" element={<CartView />} />
        <Route path="producto/:id" element={<ProductView />} />
        <Route path="carrito" element={<CartView />} />
        <Route path="favoritos" element={<FavView />} />
        <Route path="checkout" element={<CheckoutView />} />
        <Route path="/cliente/estatus" element={<OrderStatusView />} />
        <Route path="review" element={<ReviewView />} />
      </Route>

      {/* Admin - rutas separadas, sin Layout del cliente */}
      <Route path="/admin" element={<><NavbarAdmin /><AdminPanel /></>} />
      <Route path="/admin/productos" element={<><NavbarAdmin /><AdminProductos /></>} />
      <Route path="/admin/auxiliares" element={<><NavbarAdmin /><AdminAuxiliares /></>} />
      <Route path="/admin/comentarios" element={<><NavbarAdmin /><AdminComentarios /></>} />
    </Routes>
  );
} export default App;

