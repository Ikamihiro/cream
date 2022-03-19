import { useChat } from "../../contexts/chat.context"

export default function ChatSpace() {
  const { chat } = useChat()

  if (chat === null) {
    return (
      <>
        <h1>Escolha um chat</h1>
      </>
    )
  }

  return (
    <>
      {chat.name}
    </>
  )
}