import Head from "next/head"
import Router from "next/router"
import nextCookie from "next-cookies"
import { withAuthSync } from "../helpers/auth"
import Layout from "../components/Layout"
import { useUser } from "../context/user.context"
import { useEffect } from "react"

const Home = ({ user: userIncomming }) => {
  const { user, setUser } = useUser()

  useEffect(() => {
    if (user === null) {
      setUser(userIncomming)
    }
  }, [userIncomming, setUser])

  return (
    <div>
      <Head>
        <title>Cream - Home</title>
        <meta name="description" content="Sistema de chat real-time" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Layout>
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
