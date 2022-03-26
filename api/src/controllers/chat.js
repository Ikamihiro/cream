const Chat = require("./../models/chat");
const User = require("./../models/user");

const getAll = async (req, res) => {
  try {
    const currentUser = req.user;
    const chats = await Chat.find({
      "participants.participantId": currentUser._id,
    }).sort({ createdAt: -1 });

    return res.status(200).json(chats);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Ocorreu um erro no servidor",
    });
  }
};

const getById = async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({
        error: "Chat especificado não existe",
      });
    }

    return res.status(200).json(chat);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Ocorreu um erro no servidor",
    });
  }
};

const create = async (req, res) => {
  try {
    const { name, title, description } = req.body;

    if (!(name || title || description)) {
      return res.status(400).json({
        error: "É necessário informar os dados do chat",
      });
    }

    const currentUser = req.user;
    const participants = [
      {
        participantId: currentUser._id,
        name: currentUser.name,
        email: currentUser.email,
        isAdmin: true,
      },
    ];

    const chat = await Chat.create({
      name: name,
      title: title,
      description: description,
      participants: participants,
    });

    return res.status(200).json(chat);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Ocorreu um erro no servidor",
    });
  }
};

const update = async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const { name, title, description } = req.body;

    if (!(name || title || description)) {
      return res.status(400).json({
        error: "É necessário informar os dados do chat",
      });
    }

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({
        error: "Chat especificado não existe",
      });
    }

    await Chat.findByIdAndUpdate(chatId, {
      name: name,
      title: title,
      description: description,
    });

    return res.status(200).json(await Chat.findById(chat._id));
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Ocorreu um erro no servidor",
    });
  }
};

const addParticipant = async (req, res) => {
  try {
    const { participantEmail, chatId } = req.body;

    const participant = await User.findOne({
      email: participantEmail,
    });

    if (!participant) {
      return res.status(404).json({
        error: "Participante especificado não existe",
      });
    }

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({
        error: "Chat especificado não existe",
      });
    }

    if (
      chat.participants.find(
        (p) => String(p.participantId) === String(participant._id)
      )
    ) {
      return res.status(400).json({
        error: "Participante já está adicionado no grupo",
      });
    }

    const newParticipants = [
      ...chat.participants,
      {
        participantId: participant._id,
        name: participant.name,
        email: participant.email,
      },
    ];

    await Chat.findByIdAndUpdate(chat._id, {
      participants: newParticipants,
    });

    return res.status(200).json(await Chat.findById(chat._id));
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Ocorreu um erro no servidor",
    });
  }
};

const removeParticipant = async (req, res) => {
  try {
    const { chatId, participantId } = req.body;

    const participant = await User.findById(participantId);
    if (!participant) {
      return res.status(404).json({
        error: "Participante especificado não existe",
      });
    }

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({
        error: "Chat especificado não existe",
      });
    }

    if (
      !chat.participants.find(
        (p) => String(p.participantId) === String(participant._id)
      )
    ) {
      return res.status(400).json({
        error: "Participante não está adicionado no grupo",
      });
    }

    const newParticipants = chat.participants.filter(
      (p) => String(p.participantId) !== String(participant._id)
    );
    await Chat.findByIdAndUpdate(chat._id, {
      participants: newParticipants,
    });

    return res.status(200).json(await Chat.findById(chat._id));
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Ocorreu um erro no servidor",
    });
  }
};

module.exports = {
  getAll: getAll,
  getById: getById,
  create: create,
  update: update,
  addParticipant: addParticipant,
  removeParticipant: removeParticipant,
};
