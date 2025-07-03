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
Ejemplo de petición desde el frontend (aquí simulamos con postman)
fetch("http://localhost:3000/registroUsuarios", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    correo: "carlos@correo.com",
    contraseña: "123456",
    nombre: "Carlos",
    apellido: "Guillén",
    rol: "Cliente"
  })
});
*/