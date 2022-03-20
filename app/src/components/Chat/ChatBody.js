import { Flex } from "@chakra-ui/react"
import { useChat } from "../../contexts/chat.context"
import { useUser } from "../../contexts/user.context"
import Message from "../Message/Message"

export default function ChatBody() {
  const { messages } = useChat()
  const { user } = useUser()

  return (
    <>
      <Flex
        paddingX={"2rem"}
        paddingY={"1rem"}
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
        {messages.map((message, index) => {
          let isSelf = message.sender.senderId === user._id

          return (
            <Message
              key={index}
              type={message.type}
              content={message.content}
              isSelf={isSelf}
              sender={{
                name: message.sender.senderName
              }}
              sendAt={message.sendAt}
            />
          )
        })}
      </Flex>
    </>
  )
}