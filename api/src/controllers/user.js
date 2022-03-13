const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("./../models/user")

const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password
    } = req.body

    if (!(name || password || email)) {
      return res.status(400).json({
        error: "É necessário especificar os dados"
      })
    }

    const userExisting = await User.findOne({
      email: email.toLowerCase()
    })

    if (userExisting) {
      return res.status(400).json({
        error: "Já existe um usuário com esse email"
      })
    }

    const passwordEncrypted = await bcrypt.hash(password, 10)

    const user = await User.create({
      name: name,
      email: email.toLowerCase(),
      password: passwordEncrypted
    })

    const token = jwt.sign({
      user_id: user._id,
      email: email
    }, process.env.TOKEN_KEY, {
      expiresIn: "24h"
    })

    user.token = token

    return res.status(200).json(user)
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      error: "Ocorreu um erro no servidor"
    })
  }
}

const login = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body

    if (!(password || email)) {
      return res.status(400).json({
        error: "É necessário especificar os dados"
      })
    }

    const user = await User.findOne({
      email: email
    })

    if (!user) {
      return res.status(400).json({
        error: "Usuário não existe"
      })
    }

    const verify = await bcrypt.compare(password, user.password)
    if (!verify) {
      return res.status(400).send({
        error: "Credenciais inválidas"
      });
    }

    const token = jwt.sign({
      user_id: user._id,
      email: email
    }, process.env.TOKEN_KEY, {
      expiresIn: "24h",
    }
    );

    user.token = token;

    return res.status(200).json(user);
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      error: "Ocorreu um erro no servidor"
    })
  }
}

module.exports = {
  register: register,
  login: login
}