import { Box, useDisclosure } from "@chakra-ui/react";
import Chats from "../Modals/Chats";
import Config from "../Modals/Config";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  const {
    isOpen: isConfigOpen,
    onOpen: onConfigOpen,
    onClose: onConfigClose,
  } = useDisclosure();

  const {
    isOpen: isAddChatOpen,
    onOpen: onAddChatOpen,
    onClose: onAddChatClose,
  } = useDisclosure();

  return (
    <Box minH={"100vh"} bg={"white"}>
      <Sidebar onConfigOpen={onConfigOpen} onAddChatOpen={onAddChatOpen} />
      <Box ml={"96"} p={"0"} h={"100vh"}>
        {children}
      </Box>
      <Config isOpen={isConfigOpen} onClose={onConfigClose} />
      <Chats isOpen={isAddChatOpen} onClose={onAddChatClose} />
    </Box>
  );
}
