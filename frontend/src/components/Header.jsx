import { Link } from "react-router"
import { useAuth } from "@/context/AuthContext"

export default function Header() {
  const { user, loading, logout } = useAuth()

  return (
    <header className="h-16 border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-full max-w-4xl items-center justify-between px-4">
        <Link to="/" className="text-lg font-bold text-gray-900">
          Rembg
        </Link>

        {!loading && (
          <nav className="flex items-center gap-3 text-sm">
            {user ? (
              <>
                {/* Indicateur de connexion */}
                <span className="flex items-center gap-2 text-gray-600">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  {user.email}
                </span>
                <button
                  onClick={logout}
                  className="rounded-lg border border-gray-300 px-3 py-1.5 font-medium text-gray-700 hover:bg-gray-50"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-3 py-1.5 font-medium text-gray-700 hover:text-gray-900">
                  Connexion
                </Link>
                <Link
                  to="/signup"
                  className="rounded-lg bg-indigo-600 px-3 py-1.5 font-medium text-white hover:bg-indigo-700"
                >
                  S'inscrire
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}
