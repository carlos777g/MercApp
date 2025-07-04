import express from "express";
import bcrypt from "bcrypt";
import pool from "../config/db.js"; // archivo de la conexión a la base de datos
import jwt from "jsonwebtoken";
const router = express.Router();

const saltRounds = 10;

// Ruta para registrar un nuevo usuario
router.post("/registro", async (req, res) => {
  const { correo, contraseña, nombre, apellido, rol } = req.body;

  try {
    // Validación básica
    if (!correo || !contraseña || !nombre || !rol) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    // Verificar si el correo ya existe
    const existingUser = await pool.query(
      "SELECT * FROM Usuarios WHERE Correo = $1",
      [correo]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: "El correo ya está registrado" });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(contraseña, saltRounds);

    // Insertar en la base
    const result = await pool.query(
      `INSERT INTO Usuarios (Correo, Contraseña, Nombre, Apellido, Rol)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING Id_usuario, Correo, Nombre, Apellido, Rol`,
      [correo, hashedPassword, nombre, apellido, rol]
    );

    const usuario = result.rows[0];

    // Éxito: enviar los datos mínimos al frontend
    const token = jwt.sign({ id: usuario.id_usuario, correo: usuario.correo }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ mensaje: "Registrado", token });
    // res.status(201).json({ mensaje: "Usuario registrado", usuario: nuevoUsuario });

  } catch (err) {
    console.error("Error en /registro:", err);

    // Por si el error es por restricción de la base (como unique)
    if (err.code === "23505") {
      return res.status(409).json({ error: "Correo ya registrado" });
    }

    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;