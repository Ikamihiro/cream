import { io } from "socket.io-client";
import { SOCKET_URL } from "./constants";

export const connectWithSocket = (user) => {
  try {
    const socket = io(SOCKET_URL, {
      query: {
        origin: "client",
        userId: user._id
      }
    })
  
    return socket
  } catch (error) {
    throw error
  }
}