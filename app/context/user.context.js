import React, { useState, createContext, useContext, useEffect } from "react"

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
  const [userLoaded, setUserLoaded] = useState(false)

  useEffect(() => {
    if (user !== null) {
      setUserLoaded(true)
      console.log('User changed:', user);
    }
  }, [user, setUserLoaded]);

  return <UserContext.Provider value={{
    user: user,
    setUser: setUser,
    userLoaded: userLoaded
  }}>
    {props.children}
  </UserContext.Provider>
}