import { Link } from "react-router"
import AuthForm from "@/components/AuthForm"
import { useAuth } from "@/context/AuthContext"

export default function Login() {
  const { login } = useAuth()

  return (
    <AuthForm
      title="Connexion"
      submitLabel="Se connecter"
      onSubmit={login}
      footer={
        <>
          Pas encore de compte ?{" "}
          <Link to="/signup" className="font-medium text-indigo-600 hover:underline">
            Inscris-toi
          </Link>
        </>
      }
    />
  )
}
