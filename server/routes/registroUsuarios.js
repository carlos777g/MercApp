import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

const router = express.Router();
const saltRounds = 10;

// ---------- Registro ----------
router.post("/registro", async (req, res) => {
  const { correo, contraseña, nombre, apellido, rol } = req.body;

  try {
    if (!correo || !contraseña || !nombre || !rol) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const existingUser = await pool.query(
      "SELECT * FROM Usuarios WHERE Correo = $1",
      [correo]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: "El correo ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(contraseña, saltRounds);

    const result = await pool.query(
      `INSERT INTO Usuarios (Correo, Contraseña, Nombre, Apellido, Rol)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING Id_usuario, Correo, Nombre, Apellido, Rol`,
      [correo, hashedPassword, nombre, apellido, rol]
    );

    const usuario = result.rows[0];

    const token = jwt.sign(
      { id: usuario.id_usuario, correo: usuario.correo },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ mensaje: "Registrado", token });
  } catch (err) {
    console.error("Error en /registro:", err);
    if (err.code === "23505") {
      return res.status(409).json({ error: "Correo ya registrado" });
    }
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// ---------- Login ----------
router.post("/login", async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM Usuarios WHERE Correo = $1",
      [correo]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Correo no registrado" });
    }

    const usuario = result.rows[0];

    const valid = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!valid) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: usuario.id_usuario, correo: usuario.correo },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ mensaje: "Login exitoso", token, usuario });
  } catch (err) {
    console.error("Error en /login:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;
