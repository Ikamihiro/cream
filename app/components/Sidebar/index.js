import { Box, Flex, IconButton, Link, Text, useToast } from "@chakra-ui/react"
import { FiLogOut, FiUser, FiPlus } from "react-icons/fi"
import { IoIosOptions } from "react-icons/io"
// import { useState, useEffect } from "react"
import { useUser } from "../../context/user.context"
import { logout } from "../../helpers/auth"
import NavItem from "../NavItem"

export default function ({ chats, onConfigOpen, onAddChatOpen, ...rest }) {
  const toast = useToast()
  const { user } = useUser()

  const onLogoutClick = () => {
    try {
      logout();
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
      bg={"white"}
      borderRight={"1px"}
      borderColor={"gray.200"}
      w={96}
      pos={"fixed"}
      h={"full"}
      {...rest}
    >
      <Flex
        h={"12"}
        alignItems={"center"}
        mx={"0"}
        justifyContent={"space-between"}
        bg={"gray.100"}
        borderBottom={"1px"}
        borderColor={"gray.200"}
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
            onClick={() => onAddChatOpen()}
            icon={< FiPlus />}
          />
          <IconButton
            variant={"link"}
            aria-label={"configs"}
            onClick={() => onConfigOpen()}
            icon={< IoIosOptions />}
          />
          <IconButton
            variant={"link"}
            aria-label={"logout"}
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
            >
              {chat.name}
            </NavItem>
          )
        })}
      </Flex>
    </Box>
  )
}
