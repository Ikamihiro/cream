const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  participants: [
    {
      participantId: {
        type: mongoose.ObjectId,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      isAdmin: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

module.exports = mongoose.model("chat", chatSchema);
