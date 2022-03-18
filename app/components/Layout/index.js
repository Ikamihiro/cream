import { Box,  useDisclosure } from "@chakra-ui/react"
import Config from "../Config"
import Sidebar from "../Sidebar"

export default function ({ children }) {
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose
  } = useDisclosure()

  return (
    <Box minH={"100vh"} bg={"white"}>
      <Sidebar onModalOpen={onModalOpen}/>
      <Box bg={"gray.100"} ml={"96"} p={"4"} h={"100vh"}>
        {children}
      </Box>
      <Config isOpen={isModalOpen} onClose={onModalClose} />
    </Box>
  )
}