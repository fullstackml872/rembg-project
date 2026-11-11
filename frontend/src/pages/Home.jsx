import { Link } from "react-router"
import ImageUploader from "@/components/ImageUploader"
import { useAuth } from "@/context/AuthContext"

export default function Home() {
  const { user, loading } = useAuth()

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-2 text-center text-3xl font-bold text-gray-900">
          Supprimer le fond d'une image
        </h1>
        <p className="mb-8 text-center text-gray-500">
          Importe une photo, l'IA s'occupe du détourage.
        </p>

        {!loading && (user ? (
          <ImageUploader />
        ) : (
          // Fonctionnalité réservée aux comptes connectés
          <div className="rounded-xl border-2 border-dashed border-gray-300 bg-white p-10 text-center">
            <p className="mb-4 text-gray-600">Connecte-toi pour retirer le fond de tes images.</p>
            <div className="flex justify-center gap-3">
              <Link
                to="/login"
                className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
              >
                Connexion
              </Link>
              <Link
                to="/signup"
                className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700"
              >
                Créer un compte
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
