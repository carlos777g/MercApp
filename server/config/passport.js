import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import dotenv from "dotenv";
import pool from "./db.js";

dotenv.config();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK
},
  async (accessToken, refreshToken, profile, done) => {
    try {
      const res = await pool.query("SELECT * FROM Usuarios WHERE correo = $1", [profile.email]);
      if (res.rows.length > 0) {
        done(null, res.rows[0]);
      } else {
        const insert = await pool.query(
          `INSERT INTO Usuarios (correo, contraseña, nombre, rol)
           VALUES ($1, $2, $3, $4)
           RETURNING *`,
          [profile.email, "oauth-google", profile.displayName, "Cliente"]
        );
        done(null, insert.rows[0]);
      }
    } catch (err) {
      done(err, null);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id_usuario);
});

passport.deserializeUser(async (id, done) => {
  const res = await pool.query("SELECT * FROM Usuarios WHERE id_usuario = $1", [id]);
  done(null, res.rows[0]);
});
