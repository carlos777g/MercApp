import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateTokenAndRedirect = (req, res) => {
  const usuario = req.user;

  const token = jwt.sign(
    { id: usuario.id_usuario, correo: usuario.correo, rol: usuario.rol },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  // Redirigir al frontend con token en query string
  res.redirect(`http://localhost:5173/dashboard?token=${token}`);
};
