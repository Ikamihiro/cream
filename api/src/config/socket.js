const { io } = require("socket.io-client");
const { SOCKET_URL } = process.env;

var socketConnection = null;

const connectionWithSocket = () => {
  try {
    socketConnection = io(SOCKET_URL, {
      query: {
        origin: "api"
      },
    });
  } catch (error) {
    throw error;
  }
};

const getSocketConnection = () => {
  if (socketConnection === null) {
    connectionWithSocket();
  }

  return socketConnection;
};

module.exports = {
  getSocketConnection: getSocketConnection,
  connectionWithSocket: connectionWithSocket,
};
