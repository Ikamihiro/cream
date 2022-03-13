const jwt = require("jsonwebtoken")
const User = require("./../models/user")
const { TOKEN_KEY } = process.env

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]

    if (!token) {
      return res.status(403).json({
        error: "É necessário informar o Token"
      })
    }

    const decoded = jwt.verify(token, TOKEN_KEY)
    const currentUser = await User.findById(decoded.user_id)

    if (!currentUser) {
      return res.status(400).json({
        error: "Usuário não existe na base de dados"
      })
    }

    req.user = decoded
  } catch (error) {
    console.error(error)
    return res.status(401).json({
      error: "Token inválido"
    })
  }

  return next();
}

module.exports = {
  verifyToken: verifyToken
}