import jwt from "jsonwebtoken"

// Vérifie le JWT stocké dans le cookie HttpOnly "token".
// Si valide, ajoute req.userId et passe à la suite ; sinon renvoie 401.
export default function requireAuth(req, res, next) {
  const token = req.cookies.token
  if (!token) {
    return res.status(401).json({ detail: "Non connecté" })
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = payload.userId
    next()
  } catch {
    return res.status(401).json({ detail: "Session expirée, reconnecte-toi" })
  }
}
