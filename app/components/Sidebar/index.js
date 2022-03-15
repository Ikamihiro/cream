import { Box, CloseButton, Flex, IconButton, Text, useToast } from "@chakra-ui/react"
import { FiLogOut, FiUser } from "react-icons/fi"
import { logout } from "../../helpers/auth"
import NavItem from "../NavItem"

export default function ({ onClose, ...rest }) {
  const toast = useToast()

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
      >
        <Flex
          mx={"3"}
        >
          <Text
            fontSize={"18"}
            fontFamily={"monospace"}
            fontWeight={"bold"}
          >
            USERNAME
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
      <NavItem
        icon={FiUser}
        link={"/"}
      >
        {"Home"}
      </NavItem>
    </Box>
  )
}
