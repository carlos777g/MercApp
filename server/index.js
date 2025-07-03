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

const registrarUsuario = async () => {
  try {
    const response = await axios.post("http://localhost:3000/usuarios/registro", {
      correo: "carlos@correo.com",
      contraseña: "123456",
      nombre: "Carlos",
      apellido: "Guillén",
      rol: "Cliente"
    });

    console.log("Usuario registrado:", response.data);
  } catch (error) {
    console.error("Error al registrar usuario:", error.response?.data || error.message);
  }
};

*/