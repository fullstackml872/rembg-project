import { Router } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js"
import requireAuth from "../middleware/requireAuth.js"

const router = Router()

const COOKIE_OPTIONS = {
  httpOnly: true, // illisible depuis JavaScript : protège contre le vol du token par XSS
  secure: process.env.NODE_ENV === "production", // HTTPS uniquement en production
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours
}

function sendToken(res, user) {
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
  res.cookie("token", token, COOKIE_OPTIONS)
}

// Ce qu'on renvoie au front : jamais le hash du mot de passe
function publicUser(user) {
  return {
    id: user._id,
    email: user.email,
    credits: user.credits,
    is_premium: user.is_premium,
  }
}

function validate(email, password) {
  if (!email || !password) return "Email et mot de passe requis"
  if (!/^\S+@\S+\.\S+$/.test(email)) return "Email invalide"
  if (password.length < 8) return "Le mot de passe doit faire au moins 8 caractères"
  return null
}

// POST /api/auth/register
router.post("/register", async (req, res) => {
  const { email, password } = req.body ?? {}
  const error = validate(email, password)
  if (error) return res.status(400).json({ detail: error })

  const existing = await User.findOne({ email: email.toLowerCase() })
  if (existing) return res.status(409).json({ detail: "Un compte existe déjà avec cet email" })

  const passwordHash = await bcrypt.hash(password, 10)
  const user = await User.create({ email, passwordHash })

  sendToken(res, user)
  res.status(201).json({ user: publicUser(user) })
})

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body ?? {}
  if (!email || !password) return res.status(400).json({ detail: "Email et mot de passe requis" })

  const user = await User.findOne({ email: email.toLowerCase() })
  const ok = user && (await bcrypt.compare(password, user.passwordHash))
  // Même message dans les deux cas : on ne révèle pas si l'email existe
  if (!ok) return res.status(401).json({ detail: "Email ou mot de passe incorrect" })

  sendToken(res, user)
  res.json({ user: publicUser(user) })
})

// POST /api/auth/logout
router.post("/logout", (req, res) => {
  res.clearCookie("token", { ...COOKIE_OPTIONS, maxAge: undefined })
  res.json({ ok: true })
})

// GET /api/auth/me : renvoie l'utilisateur connecté (utilisé au chargement du front)
router.get("/me", requireAuth, async (req, res) => {
  const user = await User.findById(req.userId)
  if (!user) return res.status(401).json({ detail: "Utilisateur introuvable" })
  res.json({ user: publicUser(user) })
})

export default router
