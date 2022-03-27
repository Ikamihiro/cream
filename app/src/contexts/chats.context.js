import { useToast } from "@chakra-ui/react";
import { useState, createContext, useContext, useEffect } from "react";
import { useUser } from "./user.context";
import ChatsService from "../services/chats.service";

export const ChatsContext = createContext();

export function useChats() {
  const context = useContext(ChatsContext);

  if (context === undefined) {
    throw new Error("Função 'useChats' usada fora do contexto!");
  }

  return context;
}

export const ChatsProvider = (props) => {
  const toast = useToast();
  const { user, socketConnection } = useUser();
  const [chats, setChats] = useState([]);

  const refreshChats = async () => {
    try {
      if (user) {
        setChats(await ChatsService.getAll(user));
      }
    } catch (error) {
      toast({
        title: "Atenção",
        description: error.message,
        duration: 9000,
        isClosable: true,
        status: "error",
      });
    }
  };

  useEffect(() => {
    if (chats.length > 0) {
      socketConnection.emit("join_chats", chats);
    }
  }, [chats, socketConnection]);

  useEffect(() => {
    (async function () {
      try {
        const chatsLoaded = await ChatsService.getAll(user);
        setChats(chatsLoaded);
        console.log("Chats loaded!", user, chatsLoaded);
      } catch (error) {
        toast({
          title: "Atenção",
          description: error.message,
          duration: 9000,
          isClosable: true,
          status: "error",
        });
      }
    })();
  }, [user, toast]);

  return (
    <ChatsContext.Provider
      value={{
        chats: chats,
        refreshChats: refreshChats,
      }}
    >
      {props.children}
    </ChatsContext.Provider>
  );
};
