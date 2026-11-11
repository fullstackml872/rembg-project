import { Router } from "express"
import multer from "multer"
import requireAuth from "../middleware/requireAuth.js"

const router = Router()

// L'image reste en mémoire le temps de la transmettre à FastAPI
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 Mo
})

// POST /api/remove-background (réservé aux utilisateurs connectés)
// Express vérifie l'auth puis transmet l'image à FastAPI, qui fait le détourage.
router.post("/remove-background", requireAuth, upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ detail: "Aucune image envoyée" })

  const formData = new FormData()
  formData.append(
    "file",
    new Blob([req.file.buffer], { type: req.file.mimetype }),
    req.file.originalname
  )

  let response
  try {
    response = await fetch(`${process.env.FASTAPI_URL}/background_remover`, {
      method: "POST",
      body: formData,
    })
  } catch {
    return res.status(502).json({ detail: "Le service de détourage est indisponible" })
  }

  // On renvoie tel quel ce que FastAPI a répondu (PNG ou erreur JSON)
  res.status(response.status)
  res.type(response.headers.get("content-type") ?? "application/octet-stream")
  res.send(Buffer.from(await response.arrayBuffer()))
})

export default router
