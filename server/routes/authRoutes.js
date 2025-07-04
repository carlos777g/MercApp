import express from "express";
import passport from "passport";
import { generateTokenAndRedirect } from "../controllers/authController.js";

const router = express.Router();

// Ruta inicial para login con Google
router.get("/google", passport.authenticate("google", {
  scope: ["profile", "email"]
}));

// Callback de Google
router.get("/google/callback", passport.authenticate("google", {
  session: false, // No usamos sesión, usamos JWT
  failureRedirect: "/login"
}), generateTokenAndRedirect);

export default router;
