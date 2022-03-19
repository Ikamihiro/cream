import { Flex, Icon, Text } from "@chakra-ui/react"
import { FiUser } from "react-icons/fi"
import { useChat } from "../../contexts/chat.context"

export default function ChatHead() {
  const { chat } = useChat()

  return (
    <>
      <Flex
        bg={"gray.300"}
        w={"100%"}
        h={"14"}
        padding={"1rem"}
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Flex
          minH={"100%"}
          justifyContent={"start"}
          alignItems={"center"}
          padding={"0"}
        >
          <Icon
            w={"6"}
            h={"6"}
            as={FiUser}
            marginRight=".5rem"
          />
          <Text
            fontSize={"14pt"}
            fontWeight={"bold"}
            padding={"0"}
            fontFamily={"monospace"}
          >
            {chat.title}
          </Text>
        </Flex>
      </Flex>
    </>
  )
}