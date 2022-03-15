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

  useEffect(() => {
    console.log('User changed:', user);
  }, [user]);

  return <UserContext.Provider value={{
    user: user,
    setUser: setUser
  }}>
    {props.children}
  </UserContext.Provider>
}