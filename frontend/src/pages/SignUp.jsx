import { Link } from "react-router"
import AuthForm from "@/components/AuthForm"
import { useAuth } from "@/context/AuthContext"

export default function SignUp() {
  const { register } = useAuth()

  return (
    <AuthForm
      title="Créer un compte"
      submitLabel="S'inscrire"
      onSubmit={register}
      footer={
        <>
          Déjà un compte ?{" "}
          <Link to="/login" className="font-medium text-indigo-600 hover:underline">
            Connecte-toi
          </Link>
        </>
      }
    />
  )
}
