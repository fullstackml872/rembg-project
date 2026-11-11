import { useState } from "react"
import axios from "axios"

export default function ImageUploader() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  function handleChange(e) {
    const selected = e.target.files[0]
    if (!selected) return
    setFile(selected)
    setPreview(URL.createObjectURL(selected))
    setResult(null)
    setError(null)
  }

  async function handleSubmit() {
    if (!file) {
      setError("Choisis une image d'abord.")
      return
    }

    const formData = new FormData()
    formData.append("file", file)

    setLoading(true)
    setError(null)

    try {
      // Passe par Express, qui vérifie qu'on est connecté avant d'appeler FastAPI
      const response = await axios.post("/api/remove-background", formData, {
        responseType: "blob",
      })
      setResult(URL.createObjectURL(response.data))
    } catch (err) {
      setError(
        err.response?.status === 401
          ? "Ta session a expiré, reconnecte-toi."
          : "Erreur : image invalide ou format non supporté (JPG/PNG)."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Zone d'import */}
      <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 bg-white p-10 text-center transition hover:border-indigo-400 hover:bg-indigo-50">
        <span className="text-4xl">🖼️</span>
        <span className="font-medium text-gray-700">
          {file ? file.name : "Clique pour choisir une image"}
        </span>
        <span className="text-sm text-gray-400">JPG ou PNG</span>
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleChange}
          className="hidden"
        />
      </label>

      <button
        onClick={handleSubmit}
        disabled={loading || !file}
        className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Chargement…" : "Retirer le fond"}
      </button>

      {error && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</p>
      )}

      {/* Aperçu + résultat */}
      {preview && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="mb-3 text-sm font-medium text-gray-500">Original</p>
            <img src={preview} alt="Aperçu" className="mx-auto max-h-64 rounded" />
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="mb-3 text-sm font-medium text-gray-500">Sans fond</p>
            <div className="flex min-h-40 items-center justify-center rounded bg-gray-100">
              {loading && <p className="text-sm text-gray-400">Chargement…</p>}
              {!loading && result && (
                <img src={result} alt="Résultat" className="max-h-64" />
              )}
              {!loading && !result && (
                <p className="text-sm text-gray-400">Le résultat apparaîtra ici</p>
              )}
            </div>
          </div>
        </div>
      )}

      {result && (
        <a
          href={result}
          download="resultat.png"
          className="block w-full rounded-lg border border-indigo-600 px-4 py-3 text-center font-medium text-indigo-600 transition hover:bg-indigo-50"
        >
          Télécharger le résultat
        </a>
      )}
    </div>
  )
}
