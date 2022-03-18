const path = require("path")
const fs = require('fs')
const Message = require("./../models/message")
const Chat = require("./../models/chat")
const User = require("./../models/user")
const { uuid } = require("../utils/uuid")
const { APP_URL } = process.env

const getAll = async (req, res) => {
  try {
    const chatId = req.params.chatId
    const {
      lastMessageDate
    } = req.query;

    if (!await Chat.findById(chatId)) {
      return res.status(404).json({
        error: "Chat especificado não existe"
      })
    }

    const query = {
      "chat.chatId": chatId,
    }

    if (lastMessageDate) {
      query["sendAt"] = { $lte: new Date(lastMessageDate) }
    }

    const messages = await Message
      .find(query)
      .sort({ sendAt: -1 })
      .limit(10)

    return res.status(200).json(messages)
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      error: "Ocorreu um erro no servidor"
    })
  }
}

const getLastMessages = async (req, res) => {
  try {
    const chatIds = req.params.chatIds

    if (!Array.isArray(chatIds)) {
      return res.status(400).json({
        error: "É necessário informar os chats!"
      })
    }

    const messages = []

    chatIds.forEach(async (chatId) => {
      const query = {
        "chat.chatId": chatId,
      }

      const lastMessage = await Message
        .findOne(query)
        .sort({ sendAt: -1 })

      messages.push(lastMessage)
    });

    return res.status(200).json(messages)
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      error: "Ocorreu um erro no servidor"
    })
  }
}

const getById = async (req, res) => {
  try {
    const messageId = req.params.messageId
    const message = await Message.findById(messageId)
    if (!message) {
      return res.status(404).json({
        error: "Mensagem especificada não existe"
      })
    }

    return res.status(200).json(message)
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      error: "Ocorreu um erro no servidor"
    })
  }
}

const sendText = async (req, res) => {
  try {
    const {
      body,
      chatId
    } = req.body

    if (!(body || chatId)) {
      return res.status(400).json({
        error: "É necessário especificar os dados"
      })
    }

    const chat = await Chat.findById(chatId)
    if (!chat) {
      return res.status(404).json({
        error: "Chat especificado não existe"
      })
    }

    const sender = await User.findById(req.user.user_id)

    const message = await Message.create({
      content: {
        body: body
      },
      type: "text",
      sendAt: Date.now(),
      sender: {
        senderId: sender._id,
        senderName: sender.name
      },
      chat: {
        chatId: chat._id,
        chatName: chat.name
      }
    })

    return res.status(200).json(message)
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      error: "Ocorreu um erro no servidor"
    })
  }
}

const sendFile = async (req, res) => {
  try {
    const {
      chatId,
      type,
      caption
    } = req.body
    const file = req.files.file

    if (!(file || chatId || type)) {
      return res.status(404).json({
        error: "É necessário especificar os dados"
      })
    }

    const chat = await Chat.findById(chatId)
    if (!chat) {
      return res.status(404).json({
        error: "Chat especificado não existe"
      })
    }

    const basePath = path.join(__dirname, "/../../public", "files/" + chatId)

    if (!fs.existsSync(basePath)) {
      fs.mkdirSync(basePath)
    }

    const fileName = `${uuid()}.${file.name.split(".")[1]}`
    const fullPath = path.join(basePath, fileName)
    console.log(fullPath)

    file.mv(fullPath, err => {
      if (err) {
        return res.status(500).json({
          error: err.message
        })
      }
    })

    const sender = await User.findById(req.user.user_id)

    const message = await Message.create({
      content: {
        body: `${APP_URL}/files/${chatId}/${fileName}`,
        caption: caption || null
      },
      type: type,
      sendAt: Date.now(),
      sender: {
        senderId: sender._id,
        senderName: sender.name
      },
      chat: {
        chatId: chat._id,
        chatName: chat.name
      }
    })

    return res.status(200).json(message)
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      error: "Ocorreu um erro no servidor"
    })
  }
}

module.exports = {
  getAll: getAll,
  getById: getById,
  getLastMessages: getLastMessages,
  sendText: sendText,
  sendFile: sendFile
}