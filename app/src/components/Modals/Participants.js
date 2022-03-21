import { IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Tab, Table, TabList, TabPanel, TabPanels, Tabs, Tbody, Td, Th, Thead, Tr, useToast } from "@chakra-ui/react"
import { useChat } from "../../contexts/chat.context"
import AddParticipant from "../Forms/AddParticipant"
import { FiTrash } from "react-icons/fi"
import ChatsService from "../../services/chats.service"
import { useUser } from "../../contexts/user.context"

export default function Participants({ isOpen, onClose }) {
  const { user } = useUser()
  const { chat, setChat } = useChat()
  const toast = useToast()

  const removeParticipant = async (participantId) => {
    try {
      const participantUser = chat.participants.find(p => p.participantId === user._id)

      if (!participantUser) {
        throw new Error("Opa! Aconteceu inesperado!")
      }

      if (participantUser.isAdmin === false) {
        throw new Error("Você não é admin!")
      }

      setChat(await ChatsService.removeParticipant(user, chat._id, participantId))
      
      toast({
        title: "Uouu!",
        description: "Participante removido com sucesso!",
        duration: 9000,
        isClosable: true,
        status: "success"
      })
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
    <Modal size={"4xl"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Participantes</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs>
            <TabList>
              <Tab>Participantes</Tab>
              <Tab>Adicionar participante</Tab>
            </TabList>
            <TabPanels>
              <TabPanel
                paddingX={0}
                paddingY={".5rem"}
              >
                <Table variant='simple'>
                  <Thead>
                    <Tr>
                      <Th>Name</Th>
                      <Th>Email</Th>
                      <Th>Ações</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {chat.participants.map((participant, index) => {
                      return (
                        <Tr key={index}>
                          <Td>{participant.name}</Td>
                          <Td>{participant.email}</Td>
                          <Td>
                            <IconButton
                              variant={"link"}
                              color={"black"}
                              icon={<FiTrash />}
                              onClick={() => removeParticipant(participant.participantId)}
                            />
                          </Td>
                        </Tr>
                      )
                    })}
                  </Tbody>
                </Table>
              </TabPanel>
              <TabPanel>
                <AddParticipant />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}