import Layout from "../components/Layout/Layout"
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
        <Layout>
          <h1>INDEX</h1>
        </Layout>
      </ChatsProvider>
    </>
  )
}

