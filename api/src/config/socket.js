const { Socket, io } = require("socket.io-client");
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

/**
 * @returns {Socket}
 */
const getSocketConnection = () => {
  if (socketConnection === null) {
    connectionWithSocket();
  }

  return socketConnection;
};

module.exports = {
  getSocketConnection,
  connectionWithSocket,
};
