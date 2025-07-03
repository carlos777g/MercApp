import express from "express";
import usuariosRoutes from "./routes/registroUsuarios.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/registroUsuarios", usuariosRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
