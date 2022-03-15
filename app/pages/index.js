import Head from 'next/head'
import Router from "next/router"
import nextCookie from "next-cookies"
import { withAuthSync } from '../helpers/auth'
import Layout from '../components/Layout'

const Home = props => {
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
    const { token } = nextCookie(ctx)

    if (token) {
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
