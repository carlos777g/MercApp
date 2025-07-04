import { useState } from 'react';
import './Login.css';

export default function Login() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Correo:', correo);
    console.log('Password:', password);
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
