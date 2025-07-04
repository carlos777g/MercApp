// src/components/NavbarAdmin.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function NavbarAdmin() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/admin">Panel Admin</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/admin/productos">🛍️ Productos</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/auxiliares">👤 Auxiliares</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/comentarios">💬 Comentarios</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavbarAdmin;
