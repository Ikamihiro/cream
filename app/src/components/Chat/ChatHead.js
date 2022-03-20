import { Flex, Icon, IconButton, Text, useDisclosure } from "@chakra-ui/react"
import { FiUser, FiSettings } from "react-icons/fi"
import { BsFillPersonPlusFill } from "react-icons/bs"
import { useChat } from "../../contexts/chat.context"
import Participants from "../Modals/Participants"

export default function ChatHead() {
  const { chat } = useChat()
  const {
    isOpen: isParticipantsOpen,
    onOpen: onParticipantsOpen,
    onClose: onParticipantsClose
  } = useDisclosure()

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
          direction={"row"}
          justifyContent={"start"}
          alignItems={"center"}
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
        <Flex
          direction={"row"}
          justifyContent={"flex-end"}
          alignItems={"center"}
        >
          <IconButton
            variant={"link"}
            color={"black"}
            aria-label={"chat config"}
            bgColor={"gray.300"}
            icon={<BsFillPersonPlusFill />}
            onClick={() => onParticipantsOpen()}
          />
          <IconButton
            variant={"link"}
            color={"black"}
            aria-label={"chat config"}
            bgColor={"gray.300"}
            icon={<FiSettings />}
          />
        </Flex>
      </Flex>
      <Participants
        isOpen={isParticipantsOpen}
        onClose={onParticipantsClose}
      />
    </>
  )
}