// src/pages/admin/AdminPanel.jsx
import React from 'react';
import NavbarAdmin from '../../components/NavbarAdmin';

export default function AdminPanel() {
  return (
    <>
      <div className="container py-5 text-black">
        <h2 className="mb-4">Panel de Administración</h2>
        <p>Bienvenido al panel del administrador. Usa la barra superior para gestionar productos, auxiliares y comentarios de clientes.</p>
        <div className="alert alert-info mt-4">
          Puedes comenzar seleccionando una opción en la navegación superior.
        </div>
      </div>
    </>
  );
}
