import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Au chargement : le cookie HttpOnly est envoyé automatiquement,
  // /me nous dit si on est déjà connecté.
  useEffect(() => {
    axios
      .get("/api/auth/me")
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  async function login(email, password) {
    const res = await axios.post("/api/auth/login", { email, password })
    setUser(res.data.user)
  }

  async function register(email, password) {
    const res = await axios.post("/api/auth/register", { email, password })
    setUser(res.data.user)
  }

  async function logout() {
    await axios.post("/api/auth/logout")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
