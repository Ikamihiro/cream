import Head from "next/head"
import Router from "next/router"
import nextCookie from "next-cookies"
import { withAuthSync } from "../helpers/auth"
import Layout from "../components/Layout"
import ChatService from "../services/chat.service"
import { useUser } from "../context/user.context"
import { useEffect } from "react"
import { ChatProvider } from "../context/chats.context"

const Home = ({ user: userIncomming }) => {
  const {
    user,
    setUser
  } = useUser()

  useEffect(() => {
    if (user === null) {
      setUser(userIncomming)
    }
  }, [userIncomming, setUser])

  return (
    <ChatProvider chatIncoming={{}}>
      <div>
        <Head>
          <title>Cream - Chat</title>
          <meta name="description" content="Sistema de chat real-time" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <Layout>
            <h1>TESTE</h1>
          </Layout>
        </main>
      </div>
    </ChatProvider>
  )
}

Home.getInitialProps = async ctx => {
  const redirectOnError = () => {
    if (typeof window === 'undefined') {
      ctx.res.writeHead(302, { Location: '/login' })
      ctx.res.end()
    } else {
      Router.push('/login')
    }
  }

  try {
    const { user } = nextCookie(ctx)

    if (user) {
      return {
        props: {}
      }
    }

    return redirectOnError()
  } catch (error) {
    return redirectOnError()
  }
}

export default withAuthSync(Home)
