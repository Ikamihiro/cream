import axios from "axios";
import { API_URL } from "../utils/constants";

const getAll = async (user) => {
  try {
    const response = await axios.get(API_URL + "/chat", {
      headers: {
        Authorization: user.token,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

const getById = async (user, chatId) => {
  try {
    const response = await axios.get(API_URL + "/chat/" + chatId, {
      headers: {
        Authorization: user.token,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

const create = async (user, chat) => {
  try {
    const { name, title, description } = chat;

    const response = await axios.post(
      API_URL + "/chat",
      {
        name: name,
        title: title,
        description: description,
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

const update = async (user, chatId, chat) => {
  try {
    const { name, title, description } = chat;

    const response = await axios.post(
      API_URL + "/chat/" + chatId,
      {
        name: name,
        title: title,
        description: description,
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

const addParticipant = async (user, chatId, participantEmail) => {
  try {
    const response = await axios.post(
      API_URL + "/chat/addParticipant",
      {
        chatId: chatId,
        participantEmail: participantEmail,
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

const removeParticipant = async (user, chatId, participantId) => {
  try {
    const response = await axios.post(
      API_URL + "/chat/removeParticipant",
      {
        chatId: chatId,
        participantId: participantId,
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

const ChatsService = {
  getAll: getAll,
  getById: getById,
  create: create,
  update: update,
  addParticipant: addParticipant,
  removeParticipant: removeParticipant,
};

export default ChatsService;
