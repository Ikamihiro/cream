import axios from "axios";
import { API_URL } from "../utils/constants";

const getAll = async (user, chat) => {
  try {
    const chatId = chat._id;

    const response = await axios.get(API_URL + "/message/" + chatId, {
      headers: {
        Authorization: user.token,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

const getLastMessages = async (user, chats) => {
  try {
    if (!Array.isArray(chats)) {
      throw new Error("É necessário especificar as conversas!");
    }

    const chatIds = chats.map((chat) => chat._id);

    if (chatIds.length === 0) {
      return [];
    }

    const response = await axios.get(API_URL + "/lastMessages", {
      headers: {
        Authorization: user.token,
      },
      data: {
        chatIds: chatIds,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

const getById = async (user, messageId) => {
  try {
    const response = await axios.get(API_URL + "/message/show/" + messageId, {
      headers: {
        Authorization: user.token,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

const sendText = async (user, message) => {
  try {
    const { body, chatId } = message;

    const response = await axios.post(
      API_URL + "/message/sendText",
      {
        body: body,
        chatId: chatId,
      },
      {
        headers: {
          Authorization: user.token,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

const sendFile = async (user, message) => {};

const MessagesService = {
  getAll: getAll,
  getLastMessages: getLastMessages,
  getById: getById,
  sendText: sendText,
  sendFile: sendFile,
};

export default MessagesService;
