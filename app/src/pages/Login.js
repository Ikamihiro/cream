import { useState } from "react"
import LoginForm from "../components/Forms/Login"
import RegisterForm from "../components/Forms/Register"

export default function Login() {
  const [isLogin, setIsLogin] = useState(true)

  if (isLogin) {
    return <LoginForm setIsLogin={setIsLogin} />
  } else {
    return <RegisterForm setIsLogin={setIsLogin} />
  }

}
