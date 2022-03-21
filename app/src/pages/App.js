import ChatSpace from "../components/Chat/ChatSpace"
import Layout from "../components/Layout/Layout"
import { ChatProvider } from "../contexts/chat.context"
import { ChatsProvider } from "../contexts/chats.context"
import { useUser } from "../contexts/user.context"
import Login from "./Login"

export default function App() {
  const { user } = useUser()

  if (user === null) {
    return <Login />
  }

  return (
    <>
      <ChatsProvider>
        <ChatProvider>
          <Layout>
            <ChatSpace />
          </Layout>
        </ChatProvider>
      </ChatsProvider>
    </>
  )
}

