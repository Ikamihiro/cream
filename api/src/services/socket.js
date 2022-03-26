const { getSocketConnection } = require("../config/socket");

const onNewMessage = (messageId, chatId) => {
  try {
    const newMessage = { messageId, chatId };
    getSocketConnection().emit("on_new_message", newMessage);
  } catch (error) {
    throw error;
  }
};

const onParticipantJoinChat = (chatId, participant) => {
  try {
    const newJoin = { chatId, participant };
    getSocketConnection().emit("on_join_chat", newJoin);
  } catch (error) {}
};

const onParticipantLeaveChat = (chatId, participant) => {
  try {
    const leaveChat = { chatId, participant };
    getSocketConnection().emit("on_leave_chat", leaveChat);
  } catch (error) {}
};

const onChatUpdate = (chat) => {
  try {
    const leaveChat = { chatId: chat._id, chat: chat };
    getSocketConnection().emit("on_change_chat", leaveChat);
  } catch (error) {}
};

module.exports = {
  onNewMessage,
  onParticipantJoinChat,
  onParticipantLeaveChat,
  onChatUpdate
};
