import { useState } from 'react';
import axios from 'axios';
import './Registro.css';

export default function Registro() {
  const [datos, setDatos] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    password: '',
    telefono: '',
    fechaNacimiento: '',
  });

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Datos enviados:', datos);
    // Aquí irá la lógica para enviar al backend
    try {
      const body = {
        nombre: datos.nombre,
        apellido: datos.apellido,
        correo: datos.correo,
        contraseña: datos.password, // el backend espera "contraseña"
        rol: "Cliente", // puedes ajustar esto si hay selección
      };

      const response = await axios.post("http://localhost:3000/usuarios/registro", body);

      console.log("Registro exitoso:", response.data);

      // Redirigir a otra ruta (ej: dashboard)
      window.location.href = "/dashboard";
    } catch (error) {
      if (error.response) {
        console.error("Error de servidor:", error.response.data);
        alert(error.response.data.error || "Error al registrarse");
      } else {
        console.error("Error de red:", error.message);
        alert("No se pudo conectar con el servidor");
      }
    }
  };

  return (
    <div className="registro-container">
      <form className="registro-form" onSubmit={handleSubmit}>
        <h2 className="mb-4">Registro</h2>

        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input type="text" name="nombre" className="form-control" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Apellido</label>
          <input type="text" name="apellido" className="form-control" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Correo electrónico</label>
          <input type="email" name="correo" className="form-control" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input type="password" name="password" className="form-control" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Teléfono (opcional)</label>
          <input type="tel" name="telefono" className="form-control" onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha de nacimiento (opcional)</label>
          <input type="date" name="fechaNacimiento" className="form-control" onChange={handleChange} />
        </div>

        <button type="submit" className="btn btn-success w-100">Registrarse</button>

        <div className="text-center mt-3">
          <a href="/login">¿Ya tienes cuenta? Inicia sesión</a>
        </div>
      </form>
    </div>
  );
}
