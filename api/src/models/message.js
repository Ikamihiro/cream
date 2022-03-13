const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
  content: {},
  type: {
    type: String,
    required: true
  },
  sendAt: {
    type: Date,
    default: Date.now()
  },
  sender: {
    senderId: {
      type: mongoose.ObjectId,
      required: true
    },
    senderName: {
      type: String,
      required: true
    }
  },
  chat: {
    chatId: {
      type: mongoose.ObjectId,
      required: true
    },
    chatName: {
      type: String,
      required: true
    }
  }
})

module.exports = mongoose.model("message", messageSchema)