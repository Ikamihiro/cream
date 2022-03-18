import Head from "next/head"
import Router from "next/router"
import nextCookie from "next-cookies"
import { withAuthSync } from "../helpers/auth"
import Layout from "../components/Layout"
import ChatService from "../services/chat.service"
import { useUser } from "../context/user.context"
import { useState, useEffect } from "react"

const Home = ({ user: userIncomming }) => {
  const [chats, setChats] = useState([])
  const {
    user,
    setUser,
    userLoaded
  } = useUser()

  useEffect(() => {
    if (user === null) {
      setUser(userIncomming)
    }
  }, [userIncomming, setUser])

  useEffect(() => {
    const getChatsFromUser = async () => {
      if (chats.length === 0) {
        setChats(await ChatService.getAll(user))
      }
    }

    if (userLoaded) {
      getChatsFromUser().catch(error => {
        toast({
          title: "Atenção",
          description: error.message,
          duration: 9000,
          isClosable: true,
          status: "error"
        })
      })
    }
  }, [userLoaded])

  return (
    <div>
      <Head>
        <title>Cream - Home</title>
        <meta name="description" content="Sistema de chat real-time" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Layout chats={chats}>
          <h1>TESTE</h1>
        </Layout>
      </main>
    </div>
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
