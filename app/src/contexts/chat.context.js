import { useToast } from "@chakra-ui/react";
import { useState, createContext, useContext, useEffect } from "react";
import { useUser } from "./user.context";
import MessagesService from "../services/messages.service";

export const ChatContext = createContext();

export function useChat() {
  const context = useContext(ChatContext);

  if (context === undefined) {
    throw new Error("Função 'useChat' usada fora do contexto!");
  }

  return context;
}

export const ChatProvider = (props) => {
  const toast = useToast();
  const { user, socketConnection } = useUser();
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);

  const addLoadingMessage = (newMessage) => {
    let verifyIdMessageHasAlreadyLoaded = messages.find(
      (m) => m._id === newMessage._id
    );

    if (verifyIdMessageHasAlreadyLoaded === undefined) {
      setMessages([...messages, newMessage]);
      console.log("New loading message loaded!", {
        ...newMessage,
        isLoading: true,
      });
    }
  };

  useEffect(() => {
    (async function () {
      try {
        if (chat !== null) {
          let messagesLoaded = await MessagesService.getAll(user, chat);

          messagesLoaded = messagesLoaded
            .map((message) => {
              return { ...message, isLoading: false };
            })
            .reverse();

          setMessages(messagesLoaded);
          console.log("Messages loaded!", messagesLoaded);
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
    })();
  }, [user, chat, toast]);

  useEffect(() => {
    if (socketConnection === null) {
      return;
    }

    const addMessage = (newMessage) => {
      newMessage = { ...newMessage, isLoading: false };
      let verifyIdMessageHasAlreadyLoaded = messages.findIndex(
        (m) => m._id === newMessage._id
      );

      if (verifyIdMessageHasAlreadyLoaded === -1) {
        setMessages((msgs) => [...msgs, newMessage]);
      } else {
        setMessages(
          messages.map((m) => (m._id === newMessage._id ? newMessage : m))
        );
      }

      console.log("New message loaded!", newMessage);
    };

    socketConnection.on("has_new_message", (newMessageData) => {
      (async function () {
        try {
          const { messageId } = newMessageData;

          const newMessage = await MessagesService.getById(user, messageId);
          addMessage(newMessage);
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
    });
  }, [socketConnection, user, chat, messages, toast]);

  return (
    <ChatContext.Provider
      value={{
        chat: chat,
        messages: messages,
        setChat: setChat,
        setMessages: setMessages,
        addLoadingMessage: addLoadingMessage,
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};
