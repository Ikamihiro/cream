import React, { useState, createContext, useContext, useEffect } from "react"

export const ChatContext = createContext()

export function useChat() {
  const context = useContext(ChatContext)

  if (context === undefined) {
    throw new Error("Função 'useChat' usada fora do contexto!")
  }

  return context
}

export const ChatProvider = ({ chatIncoming }) => {
  const [chat, setChat] = useState(null)

  useEffect(() => {
    if (chat === null) {
      setChat(chatIncoming)
    }
  }, [chatIncoming])

  return (
    <ChatContext.Provider value={{}}>
      {props.children}
    </ChatContext.Provider>
  )
}