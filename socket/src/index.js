const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)

app.get("/", (req, res) => {
  res.json({
    message: "Hello!"
  })
})

var serverApi = null
var clients = new Map()

const onConnectSocket = (socket) => {
  const {
    query
  } = socket.handshake

  if (query.origin === "api") {
    serverApi = socket

    console.log("API Server connected")
  } else {
    socket.chatId = query.chatId
    clients.set(query.chatId, socket)

    console.log("A Client connected")
  }

  return socket
}

io.on("connection", (socket) => {
  console.log("Something just connected");
  socket = onConnectSocket(socket)

  socket.on("new_message", (newMessage) => {
    if (clients.has(newMessage.chatId)) {
      clients.get(newMessage.chatId).emit("has_new_message", newMessage)
    }
  })
  
  socket.on("disconnect", () => {
    console.log("Something just disconnected")
    clients.delete(socket.chatId)
  })
})

server.listen(5678, () => {
  console.log("listening on *:5678")
})