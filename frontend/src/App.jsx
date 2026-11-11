import { BrowserRouter, Routes, Route } from "react-router"
import { AuthProvider } from "@/context/AuthContext"
import Header from "@/components/Header"
import Home from "@/pages/Home"
import Login from "@/pages/Login"
import SignUp from "@/pages/SignUp"

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
