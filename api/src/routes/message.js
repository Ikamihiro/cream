const express = require("express");
const MessageController = require("./../controllers/message");

const messageRouter = express.Router();

// Pega as mensagens do Chat
messageRouter.get("/:chatId", MessageController.getAll);

// Pega as ultimas mensagens
messageRouter.get("/lastMessages", MessageController.getLastMessages);

// Pega uma mensagem especificada
messageRouter.get("/show/:messageId", MessageController.getById);

// Envia uma mensagem de texto para o Chat
messageRouter.post("/sendText", MessageController.sendText);

// Envia um arquivo (image, video, audio ou documento) para o Chat
messageRouter.post("/sendFile", MessageController.sendFile);

module.exports = messageRouter;
