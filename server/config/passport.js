// config/passport.js
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import pool from "../config/db.js";
import dotenv from "dotenv/config";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const result = await pool.query("SELECT * FROM Usuarios WHERE Correo = $1", [profile.emails[0].value]);

        if (result.rows.length === 0) {
          // Usuario nuevo → crear
          const nuevoUsuario = await pool.query(
            `INSERT INTO Usuarios (Correo, Contraseña, Nombre, Rol)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [profile.emails[0].value, "oauth_google", profile.displayName, "Cliente"]
          );
          return done(null, nuevoUsuario.rows[0]);
        }

        // Usuario existente
        return done(null, result.rows[0]);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
