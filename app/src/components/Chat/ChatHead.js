import { Flex, Icon, Text } from "@chakra-ui/react";
import { FiUser } from "react-icons/fi";
import { useChat } from "../../contexts/chat.context";

export default function ChatHead() {
  const { chat } = useChat()

  return (
    <>
      <Flex
        bg={"gray.100"}
        minW={"100%"}
        h={"14"}
        padding={"1rem"}
        borderBottom={"1px"}
        borderColor={"gray.200"}
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
          >
            {chat.title}
          </Text>
        </Flex>
      </Flex>
    </>
  )
}