import express from "express";
import pool from "../config/db"; // archivo de la conexión a la base de datos
const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post("/registro", async (req, res) => {
  try {
    const { correo, contraseña, nombre, apellido, rol } = req.body;

    // Validación mínima (puedes agregar más)
    if (!correo || !contraseña || !nombre || !rol) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    const resultado = await pool.query(
      `INSERT INTO Usuarios (Correo, Contraseña, Nombre, Apellido, Rol)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [correo, contraseña, nombre, apellido, rol]
    );

    res.status(201).json({ mensaje: "Usuario registrado", usuario: resultado.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar el usuario" });
  }
});

export default router;
