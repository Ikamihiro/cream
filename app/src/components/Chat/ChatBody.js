import { Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { useChat } from "../../contexts/chat.context";
import Message from "../Message/Message";

export default function ChatBody({ messagesEndRef }) {
  const { messages } = useChat();

  useEffect(() => {
    const scrollToBottom = () => {
      if (!messagesEndRef) return;
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };

    scrollToBottom();
  }, [messages, messagesEndRef]);

  return (
    <>
      <Flex
        paddingX={"2rem"}
        paddingY={"1rem"}
        direction={"column"}
        overflowY={"auto"}
        h={"full"}
        sx={{
          "&::-webkit-scrollbar": {
            width: "8px",
            backgroundColor: "rgba(0, 0, 0, 0.07)",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0, 0, 0, 0.12)",
          },
        }}
      >
        {messages.map((message, index) => {
          return <Message key={index} message={message} />;
        })}
        <div ref={messagesEndRef}></div>
      </Flex>
    </>
  );
}
