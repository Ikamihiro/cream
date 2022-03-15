import { Box, CloseButton, Flex, IconButton, Link, Text, useToast } from "@chakra-ui/react"
import { FiLogOut, FiUser } from "react-icons/fi"
import { useUser } from "../../context/user.context"
import { logout } from "../../helpers/auth"
import NavItem from "../NavItem"

export default function ({ onClose, ...rest }) {
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
      w={{ base: "full", md: 96 }}
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
        <Flex
          mx={"3"}
        >
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
            aria-label={"logout"}
            onClick={() => onLogoutClick()}
            icon={<FiLogOut />}
          ></IconButton>
          <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
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
        <NavItem
          icon={FiUser}
          link={"/"}
        >
          {"Chat 1"}
        </NavItem>

      </Flex>
    </Box>
  )
}
