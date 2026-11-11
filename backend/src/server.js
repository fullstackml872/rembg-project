import express from "express"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import multer from "multer"
import authRoutes from "./routes/auth.js"
import imageRoutes from "./routes/images.js"

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api", imageRoutes)

// Gestion centralisée des erreurs (Express 5 attrape aussi les erreurs async)
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({ detail: "Image trop lourde (10 Mo max)" })
  }
  console.error(err)
  res.status(500).json({ detail: "Erreur serveur" })
})

await mongoose.connect(process.env.MONGODB_URI)
console.log("MongoDB connecté")

const port = process.env.PORT ?? 3000
app.listen(port, () => console.log(`API Express sur http://localhost:${port}`))
