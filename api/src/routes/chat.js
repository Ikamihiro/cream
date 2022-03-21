const express = require("express");
const ChatController = require("./../controllers/chat")

const chatRouter = express.Router()

// Todos os chats do usuário
chatRouter.get("/", ChatController.getAll)

// Pega um chat especificado
chatRouter.get("/:chatId", ChatController.getById)

// Criar um novo chat
chatRouter.post("/", ChatController.create)

// Alterar dados do chat
chatRouter.put("/:chatId", ChatController.update)

// Adicionar participante ao chat
chatRouter.post("/addParticipant", ChatController.addParticipant)

// Remover participante ao chat
chatRouter.post("/removeParticipant", ChatController.removeParticipant)

module.exports = chatRouter