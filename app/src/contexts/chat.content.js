import { useToast } from "@chakra-ui/react"
import { useState, createContext, useContext, useEffect } from "react"
import { useUser } from "./user.context"
import ChatsService from "../services/chats.service"

export const ChatContext = createContext()

export function useChat() {
  const context = useContext(ChatContext)

  if (context === undefined) {
    throw new Error("Função 'useChat' usada fora do contexto!")
  }

  return context
}

export const ChatProvider = (props) => {
  const toast = useToast()
  const { user } = useUser()
  const [chat, setChat] = useState(null)

  return (
    <ChatContext.Provider value={{
      chat: chat,
      setChat: setChat
    }}>
      {props.children}
    </ChatContext.Provider>
  )
}