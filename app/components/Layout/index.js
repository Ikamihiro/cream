import { Box, useDisclosure } from "@chakra-ui/react"
import AddChat from "../AddChat"
import Config from "../Config"
import Sidebar from "../Sidebar"

export default function ({ children }) {
  const {
    isOpen: isConfigOpen,
    onOpen: onConfigOpen,
    onClose: onConfigClose
  } = useDisclosure()

  const {
    isOpen: isAddChatOpen,
    onOpen: onAddChatOpen,
    onClose: onAddChatClose
  } = useDisclosure()

  return (
    <Box
      minH={"100vh"}
      bg={"white"}
    >
      <Sidebar
        onConfigOpen={onConfigOpen}
        onAddChatOpen={onAddChatOpen}
      />
      <Box
        bg={"gray.100"}
        ml={"96"}
        p={"4"}
        h={"100vh"}
      >
        {children}
      </Box>
      <Config
        isOpen={isConfigOpen}
        onClose={onConfigClose}
      />
      <AddChat
        isOpen={isAddChatOpen}
        onClose={onAddChatClose}
      />
    </Box>
  )
}