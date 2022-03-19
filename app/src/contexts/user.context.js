import { useState, createContext, useContext, useEffect } from "react"
import { getUser } from "../helpers/auth"

export const UserContext = createContext()

export function useUser() {
  const context = useContext(UserContext)

  if (context === undefined) {
    throw new Error("Função 'useUser' usada fora do contexto!")
  }

  return context
}

export const UserProvider = (props) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (user !== null) {
      console.log('User changed:', user)
    }
  }, [user])

  useEffect(() => {
    const userLogged = getUser()
    
    if (user === null && userLogged !== null) {
      setUser(userLogged)
    }
  }, [user, setUser])

  return (
    <UserContext.Provider value={{
      user: user,
      setUser: setUser
    }}>
      {props.children}
    </UserContext.Provider>
  )
}