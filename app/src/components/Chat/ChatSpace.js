import { Flex, Heading, Text } from "@chakra-ui/react"
import { useChat } from "../../contexts/chat.context"
import ChatBody from "./ChatBody"
import ChatFooter from "./ChatFooter"
import ChatHead from "./ChatHead"

export default function ChatSpace() {
  const { chat } = useChat()

  if (chat === null) {
    return (
      <>
        <Flex
          flexDirection={"column"}
          width={"100wh"}
          height={"100vh"}
          backgroundColor={"gray.100"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Flex
            padding={"1rem"}
          >
            <Heading
              fontFamily={"monospace"}
            >
              Bem vindo ao Cream
            </Heading>
          </Flex>
          <Flex
            padding={"1rem"}
          >
            <Text fontSize={"15pt"}>
              Escolha uma conversa
            </Text>
          </Flex>
        </Flex>
      </>
    )
  }

  return (
    <>
      <Flex
        flexDirection={"column"}
        width={"100wh"}
        height={"100vh"}
        backgroundColor={"white"}
        justifyContent={"stretch"}
        alignItems={"stretch"}
      >
        <ChatHead />
        <ChatBody />
        <ChatFooter />
      </Flex>
    </>
  )
}