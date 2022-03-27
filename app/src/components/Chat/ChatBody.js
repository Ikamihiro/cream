import { Flex } from "@chakra-ui/react";
import { useChat } from "../../contexts/chat.context";
import Message from "../Message/Message";

export default function ChatBody() {
  const { messages } = useChat();

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
      </Flex>
    </>
  );
}
