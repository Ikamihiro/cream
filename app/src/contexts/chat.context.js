import { useToast } from "@chakra-ui/react"
import { useState, createContext, useContext, useEffect } from "react"
import { useUser } from "./user.context"
import MessagesService from "../services/messages.service"

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
  const [messages, setMessages] = useState([])

  useEffect(() => {
    (async function () {
      try {
        if (chat !== null) {
          setMessages(await MessagesService.getAll(user, chat))
          console.log("Messages loaded!")
        }
      } catch (error) {
        toast({
          title: "Atenção",
          description: error.message,
          duration: 9000,
          isClosable: true,
          status: "error"
        })
      }
    })()
  }, [user, chat, toast])

  return (
    <ChatContext.Provider value={{
      chat: chat,
      messages: messages,
      setChat: setChat,
      setMessages: setMessages
    }}>
      {props.children}
    </ChatContext.Provider>
  )
}