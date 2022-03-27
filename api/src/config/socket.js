const { io } = require("socket.io-client");
const { SOCKET_URL } = process.env;

module.exports = {
  _instance: null,
  get instance() {
    if (!this._instance) {
      var socket = io(SOCKET_URL);

      socket.on("connect", function () {
        console.log("client connected.");
      });

      socket.on("connect_error", function (err) {
        console.log(err);
      });

      socket.on("connect_timeout", function () {
        console.log("connect_timeout");
      });

      socket.on("reconnect_attempt", function () {
        console.log("reconnect_attempt");
      });

      socket.on("reconnecting", function () {
        console.log("reconnecting");
      });

      this._instance = socket;
      console.log("Socket connected!");
    }

    return this._instance;
  },
};
