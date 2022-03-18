import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea
} from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import CreateChat from "../../Forms/CreateChat"
import GetInChat from "../../Forms/GetInChat"

export default function ({ isOpen, onClose }) {
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