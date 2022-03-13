import Head from 'next/head'
import Router from "next/router"
import nextCookie from "next-cookies"
import { withAuthSync } from '../helpers/auth'
import { Flex } from '@chakra-ui/react'

const Home = props => {
  return (
    <div>
      <Head>
        <title>Cream - Home</title>
        <meta name="description" content="Sistema de chat real-time" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        INDEX
      </main>
    </div>
  )
}

Home.getInitialProps = async ctx => {
  const { token } = nextCookie(ctx)

  const redirectOnError = () =>
    typeof window !== "undefined"
      ? Router.push("/login")
      : ctx.res.writeHead(302, { Location: "/login" }).end()

  try {
    if (!token) {
      return await redirectOnError()
    }

    return {}
  } catch (error) {
    return redirectOnError()
  }
}

export default withAuthSync(Home)
