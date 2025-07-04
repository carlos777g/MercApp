// src/pages/admin/AdminAuxiliares.jsx
import React, { useState } from 'react';

export default function AdminAuxiliares() {
  const [auxiliares, setAuxiliares] = useState([]);
  const [nuevoAuxiliar, setNuevoAuxiliar] = useState({
    nombre: '',
    correo: '',
    contrasena: ''
  });

  const handleAgregar = () => {
    if (!nuevoAuxiliar.nombre || !nuevoAuxiliar.correo || !nuevoAuxiliar.contrasena) {
      alert('Por favor llena todos los campos');
      return;
    }

    const nuevo = { ...nuevoAuxiliar, id: Date.now() };
    setAuxiliares([...auxiliares, nuevo]);
    setNuevoAuxiliar({ nombre: '', correo: '', contrasena: '' });
  };

  const handleEliminar = (id) => {
    const confirm = window.confirm('¿Estás seguro de eliminar este auxiliar?');
    if (confirm) {
      setAuxiliares(auxiliares.filter((a) => a.id !== id));
    }
  };

  return (
    <div className="container py-5 text-black">
      <h2 className="border-bottom pb-3">Gestión de Auxiliares 👤</h2>

      <div className="mb-4">
        <h5>Agregar nuevo auxiliar</h5>
        <input className="form-control mb-2" placeholder="Nombre" value={nuevoAuxiliar.nombre} onChange={(e) => setNuevoAuxiliar({ ...nuevoAuxiliar, nombre: e.target.value })} />
        <input className="form-control mb-2" placeholder="Correo electrónico" type="email" value={nuevoAuxiliar.correo} onChange={(e) => setNuevoAuxiliar({ ...nuevoAuxiliar, correo: e.target.value })} />
        <input className="form-control mb-2" placeholder="Contraseña" type="password" value={nuevoAuxiliar.contrasena} onChange={(e) => setNuevoAuxiliar({ ...nuevoAuxiliar, contrasena: e.target.value })} />
        <button className="btn btn-success" onClick={handleAgregar}>Agregar auxiliar ✅</button>
      </div>

      <hr />

      <h5>Auxiliares registrados:</h5>
      {auxiliares.length === 0 ? (
        <p>No hay auxiliares aún.</p>
      ) : (
        <ul className="list-group">
          {auxiliares.map((aux) => (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={aux.id}>
              <div>
                <strong>{aux.nombre}</strong> - {aux.correo}
              </div>
              <button className="btn btn-danger btn-sm" onClick={() => handleEliminar(aux.id)}>Eliminar ❌</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
