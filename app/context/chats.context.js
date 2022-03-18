import { useToast } from "@chakra-ui/react"
import React, { useState, createContext, useContext, useEffect } from "react"
import ChatService from "../services/chat.service"
import { useUser } from "./user.context"

export const ChatsContext = createContext()

export function useChats() {
  const context = useContext(ChatsContext)

  if (context === undefined) {
    throw new Error("Função 'useUser' usada fora do contexto!")
  }

  return context
}

export const ChatsProvider = (props) => {
  const toast = useToast()
  const { user, userLoaded } = useUser()
  const [chats, setChats] = useState([])

  const refreshChats = async () => {
    try {
      if (userLoaded) {
        setChats(await ChatService.getAll(user))
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
  }

  useEffect(() => {
    const getChatsFromUser = async () => {
      if (chats.length === 0) {
        setChats(await ChatService.getAll(user))
        console.log("chats loaded!")
      }
    }

    if (userLoaded) {
      getChatsFromUser().catch(error => {
        toast({
          title: "Atenção",
          description: error.message,
          duration: 9000,
          isClosable: true,
          status: "error"
        })
      })
    }
  }, [userLoaded])

  return (
    <ChatsContext.Provider value={{
      chats: chats,
      refreshChats: refreshChats
    }}>
      {props.children}
    </ChatsContext.Provider>
  )
}