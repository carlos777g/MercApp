import { useState } from 'react';
import axios from 'axios';
import './Login.css';

export default function Login() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/usuarios/login', {
        correo,
        contraseña: password, // el backend espera "contraseña"
      });

      console.log('Login exitoso:', response.data);

      // Guardar token en localStorage o context
      localStorage.setItem('token', response.data.token);

      // Redirigir al dashboard o página principal
      // window.location.href = '/dashboard';
      alert(`Login correcto, token enviado desde el backend: ${response.data.token}`);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error || 'Error al iniciar sesión');
      } else {
        alert('Error de red o servidor no disponible');
      }
      console.error('Error en login:', error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="mb-4">Iniciar sesión</h2>

        <div className="mb-3">
          <label htmlFor="correo" className="form-label">Correo electrónico</label>
          <input
            type="email"
            id="correo"
            className="form-control"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Entrar</button>

        <div className="text-center mt-3">
          <a href="/registro">¿No tienes cuenta? Regístrate</a>
        </div>
      </form>
    </div>
  );
}
