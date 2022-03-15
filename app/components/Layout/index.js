import { Box, Drawer, DrawerContent, useDisclosure } from "@chakra-ui/react"
import MobileNav from "../MobileNav";
import Sidebar from "../Sidebar"

export default function ({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH={'100vh'} bg={'white'}>
      <Sidebar
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <Sidebar onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box bg={"gray.100"} ml={{base: 0, md: 60}} p={"4"} h={"100vh"}>
        {children}
      </Box>
    </Box>
  )
}