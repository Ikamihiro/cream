const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const EVENTS = require("./events");
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://127.0.0.1:3456"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  },
});

app.get("/", (req, res) => {
  res.json({
    message: "Hello!",
  });
});

var serverApi = null;
var users = new Map();

const connectServer = (socket) => {
  serverApi = socket;
  console.log("A API se conectou!");

  return socket;
};

const connectUser = (socket, query) => {
  socket.userId = query.userId;

  users.set(query.userId, socket);
  console.log("Um Client se conectou!");

  return socket;
};

const onConnectSocket = (socket) => {
  const { query } = socket.handshake;

  socket.origin = query.origin;

  if (query.origin === "api") {
    socket = connectServer(socket);
  } else {
    socket = connectUser(socket, query);
  }

  return socket;
};

io.on("connection", (socket) => {
  socket = onConnectSocket(socket);
  console.log(socket.userId + " acabou de se conectar...");

  // Cliente se conecta nas conversas (rooms)
  socket.on(EVENTS.JOIN_CHATS, (chats) => {
    if (socket.origin === "client") {
      chats.forEach((chat) => {
        socket.join("chat:" + chat._id);
        console.log(
          "O usuário " + socket.userId + " entrou no chat chat:" + chat._id
        );
      });
    }
  });

  // API avisando que foi enviada uma nova mensagem
  socket.on(EVENTS.ON_NEW_MESSAGE, (newMessage) => {
    const { chatId } = newMessage;
    console.log("New message in chat:" + chatId, newMessage);

    io.to("chat:" + chatId).emit(EVENTS.HAS_NEW_MESSAGE, newMessage);
  });

  // API avisando que um participante adentrou à conversa
  socket.on(EVENTS.ON_JOIN_CHAT, (newJoin) => {
    const { chatId } = newJoin;
    console.log("New participant in chat:" + chatId, newJoin);

    io.to("chat:" + chatId).emit(EVENTS.HAS_NEW_JOIN_CHAT, newJoin);
  });

  // API avisando que um participante saiu da conversa
  socket.on(EVENTS.ON_LEAVE_CHAT, (leaveChat) => {
    const { chatId, userId } = leaveChat;
    const user = users.get(userId);
    console.log("Participante just leave chat:" + chatId, leaveChat);

    io.to("chat:" + chatId).emit(EVENTS.HAS_SOMEONE_LEAVE_CHAT, leaveChat);
    io.to(user.id).emit(EVENTS.LEAVE_THE_CHAT, leaveChat);
  });

  // API avisando que um chat foi atualizado
  socket.on(EVENTS.ON_CHANGE_CHAT, (chat) => {
    const { chatId } = chat;
    console.log("Chat chat:" + chatId + " updated", chat);

    io.to("chat:" + chatId).emit(EVENTS.HAS_CHANGE_CHAT, chat);
  });

  // Cliente se desconectando
  socket.on("disconnect", () => {
    console.log(socket.userId + " acabou de se desconectar...");
    users.delete(socket.userId);
  });
});

server.listen(5678, () => {
  console.log("listening on *:5678");
});
