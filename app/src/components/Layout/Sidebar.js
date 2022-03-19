import { Box, Flex, IconButton, Link, Text, useToast } from "@chakra-ui/react"
import { FiLogOut, FiUser, FiPlus } from "react-icons/fi"
import { IoIosOptions } from "react-icons/io"
import { useChats } from "../../contexts/chats.context"
import { useChat } from "../../contexts/chat.context"
import { useUser } from "../../contexts/user.context"
import { logout } from "../../helpers/auth"
import NavItem from "./NavItem"

export default function Sidebar({ onConfigOpen, onAddChatOpen, ...rest }) {
  const toast = useToast()
  const { user, setUser } = useUser()
  const { chats } = useChats()
  const { setChat } = useChat()

  const onLogoutClick = () => {
    try {
      logout();
      setUser(null);
    } catch (error) {
      toast({
        title: "Atenção",
        description: error.message,
        duration: 9000,
        isClosable: true,
        status: "error"
      })
    }
  }

  const chooseChat = (chat) => {
    try {
      setChat(chat);
    } catch (error) {
      toast({
        title: "Atenção",
        description: error.message,
        duration: 9000,
        isClosable: true,
        status: "error"
      })
    }
  }

  return (
    <Box
      bg={"gray.100"}
      shadow={"md"}
      w={96}
      pos={"fixed"}
      h={"full"}
      {...rest}
    >
      <Flex
        h={"14"}
        alignItems={"center"}
        mx={"0"}
        justifyContent={"space-between"}
        bg={"gray.300"}
      >
        <Flex mx={"3"}>
          <Text
            fontSize={"18"}
            fontFamily={"monospace"}
            fontWeight={"bold"}
          >
            <Link href={"/"}>
              {user ? user.name : ""}
            </Link>
          </Text>
        </Flex>
        <Flex
          alignItems={"center"}
          justifyContent={"end"}
        >
          <IconButton
            variant={"link"}
            aria-label={"add chat"}
            color={"black"}
            onClick={() => onAddChatOpen()}
            icon={< FiPlus />}
          />
          <IconButton
            variant={"link"}
            aria-label={"configs"}
            color={"black"}
            onClick={() => onConfigOpen()}
            icon={< IoIosOptions />}
          />
          <IconButton
            variant={"link"}
            aria-label={"logout"}
            color={"black"}
            onClick={() => onLogoutClick()}
            icon={<FiLogOut />}
          />
        </Flex>
      </Flex>
      <Flex
        direction={"column"}
        overflowY={"auto"}
        h={"full"}
        sx={{
          '&::-webkit-scrollbar': {
            width: '8px',
            backgroundColor: 'rgba(0, 0, 0, 0.07)',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0, 0, 0, 0.12)',
          },
        }}
      >
        {chats.map((chat, index) => {
          return (
            <NavItem
              key={index}
              icon={FiUser}
              link={"/"}
              onClick={() => chooseChat(chat)}
            >
              {chat.name}
            </NavItem>
          )
        })}
      </Flex>
    </Box>
  )
}
