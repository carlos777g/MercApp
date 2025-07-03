import express from "express";
import usuariosRoutes from "./routes/registroUsuarios.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/usuarios", usuariosRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

/*
====================================================================
// Ejemplo de petición desde el frontend (aquí en el backend simulamos con postman):

import axios from "axios";

const registrar = async () => {
  try {
    const res = await axios.post("http://localhost:3001/api/usuarios/registroUsuarios", {
      correo,
      contraseña,
      nombre,
      apellido,
      rol
    });

    // Aquí redirigen si todo fue bien
    console.log(res.data.mensaje);
    navigate("/dashboard"); // o donde quieras llevar al usuario

  } catch (err) {
    // Aquí muestras el error en pantalla
    if (err.response?.status === 409) {
      setError("Este correo ya está registrado");
    } else {
      setError("Error al registrar el usuario");
    }
  }
};


*/