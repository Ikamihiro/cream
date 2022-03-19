const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://127.0.0.1:3456"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  }
})

app.get("/", (req, res) => {
  res.json({
    message: "Hello!"
  })
})

var serverApi = null
var users = new Map()

const connectServer = (socket) => {
  serverApi = socket
  console.log("A API se conectou!")

  return socket
}

const connectUser = (socket, query) => {
  socket.userId = query.userId

  users.set(query.userId, socket)
  console.log("Um Client se conectou!")

  return socket
}

const onConnectSocket = (socket) => {
  const { query } = socket.handshake

  socket.origin = query.origin

  if (query.origin === "api") {
    socket = connectServer(socket)
  } else {
    socket = connectUser(socket, query)
  }

  return socket
}

io.on("connection", (socket) => {
  console.log("Alguém acabou de se conectar...");
  socket = onConnectSocket(socket)

  socket.on("join_chats", (chats) => {
    if (socket.origin === "client") {
      chats.forEach(chat => {
        socket.join("chat:" + chat._id)
        console.log("O usuário " + socket.userId + " entrou no chat " + chat._id)
      })
    }
  })

  socket.on("on_new_message", (newMessage) => {
    const { chatId } = newMessage

    io.to("chat:" + chatId).emit("has_new_message", newMessage)
  })

  socket.on("disconnect", () => {
    console.log("Alguém acabou de se desconectar...")
    users.delete(socket.userId)
  })
})

server.listen(5678, () => {
  console.log("listening on *:5678")
})