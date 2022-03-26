const mongoose = require("mongoose");
const { MONGO_URI } = process.env;

const connect = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Successfully connected to database");
  } catch (error) {
    console.log("Database connection failed");
    console.error(error);
    process.exit(1);
  }
};

module.exports = {
  connect: connect,
};
