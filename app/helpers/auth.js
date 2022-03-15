import cookie from "js-cookie"
import Router from "next/router"
import nextCookie from "next-cookies"
import { useEffect } from "react"

export const login = (user) => {
  cookie.set("user", JSON.stringify(user), { expires: 1 })
  Router.push("/")
}

export const auth = ctx => {
  try {
    const { user } = nextCookie(ctx)

    if (!user) {
      if (typeof window === 'undefined') {
        ctx.res.writeHead(302, { Location: '/login' })
        ctx.res.end()
      } else {
        Router.push('/login')
      }
    }

    return user
  } catch (error) {
    throw error
  }
}

export const logout = () => {
  cookie.remove('user')
  window.localStorage.setItem('logout', Date.now())
  Router.push('/login')
}

export const withAuthSync = WrappedComponent => {
  const Wrapper = props => {
    const syncLogout = event => {
      if (event.key === 'logout') {
        console.log('logged out from storage!')
        Router.push('/login')
      }
    }

    useEffect(() => {
      window.addEventListener('storage', syncLogout)

      return () => {
        window.removeEventListener('storage', syncLogout)
        window.localStorage.removeItem('logout')
      }
    }, [])

    return <WrappedComponent {...props} />
  }

  Wrapper.getInitialProps = async ctx => {
    const user = auth(ctx)

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx))

    return { ...componentProps, user }
  }

  return Wrapper
}