require("dotenv").config();
require("./config/database").connect();

const userRoutes = require("./routes/user");
const chatRouter = require("./routes/chat");
const messageRouter = require("./routes/message");

const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { verifyToken } = require("./middlewares/auth");
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(
  fileUpload({
    limits: {
      fileSize: 30000 * 1024,
    },
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use(express.static("public"));
app.use(userRoutes);
app.use("/chat", verifyToken, chatRouter);
app.use("/message", verifyToken, messageRouter);

module.exports = app;
