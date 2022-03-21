import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from "@chakra-ui/react"
import CreateChat from "../Forms/CreateChat"
import GetInChat from "../Forms/GetInChat"

export default function Chats({ isOpen, onClose }) {
  return (
    <Modal size={"4xl"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Conversas</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs>
            <TabList>
              <Tab>Entrar em uma conversa</Tab>
              <Tab>Criar uma nova conversa</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <GetInChat />
              </TabPanel>
              <TabPanel>
                <CreateChat />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}