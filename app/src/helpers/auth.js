export const login = (user) => {
  try {
    sessionStorage.setItem("user", JSON.stringify(user))

    return true
  } catch (error) {
    throw error
  }
}

export const getUser = () => {
  try {
    const userSession = sessionStorage.getItem("user")

    if (userSession === null) {
      return null
    }

    return JSON.parse(userSession)
  } catch (error) {
    throw error
  }
}

export const logout = () => {
  try {
    sessionStorage.removeItem("user")

    return true
  } catch (error) {
    throw error
  }
}
