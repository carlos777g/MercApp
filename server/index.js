import express from 'express';
import cors from "cors";
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Una ruta que devuelve datos
app.get('/api/saludo', (req, res) => {
  res.json({ mensaje: 'Hola desde el backend' });
});

app.listen(PORT, () => {
  console.log(`Backend en http://localhost:${PORT}`);
});
