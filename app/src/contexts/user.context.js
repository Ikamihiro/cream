import { useState, createContext, useContext, useEffect } from "react"
import { getUser } from "../helpers/auth"
import { connectWithSocket } from "../utils/socket"

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
  const [socketConnection, setSocketConnection] = useState(null)

  useEffect(() => {
    const userLogged = getUser()

    if (user === null && userLogged !== null) {
      setUser(userLogged)
    }
  }, [user, setUser])

  useEffect(() => {
    if (user !== null) {
      setSocketConnection(connectWithSocket(user))
      console.log('User changed:', user)
    }
  }, [user])

  return (
    <UserContext.Provider value={{
      user: user,
      socketConnection: socketConnection,
      setUser: setUser
    }}>
      {props.children}
    </UserContext.Provider>
  )
}