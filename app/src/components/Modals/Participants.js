import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Tab, Table, TabList, TabPanel, TabPanels, Tabs, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { useChat } from "../../contexts/chat.context"

export default function Participants({ isOpen, onClose }) {
  const { chat } = useChat()

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
                          <Td>---</Td>
                        </Tr>
                      )
                    })}
                  </Tbody>
                </Table>
              </TabPanel>
              <TabPanel>
                Adicionar participante
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}