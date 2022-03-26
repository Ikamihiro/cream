const { getSocketConnection } = require("../config/socket");

const onNewMessage = async (messageId, chatId) => {
  try {
    const newMessage = { messageId, chatId };
    getSocketConnection().emit("on_new_message", newMessage);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  onNewMessage: onNewMessage,
};
