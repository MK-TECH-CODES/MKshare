require("dotenv").config();
const mongoose = require("mongoose");

// Database connection
async function connectdb() {
  mongoose
    .connect(process.env.MONGO_CONNECTION_URL, {
      // Remove deprecated options
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database is connected");
    })
    .catch((error) => {
      console.error("Error connecting to the database:", error);
      setTimeout(() => connectdb(callback), 5000);
    });
}

module.exports = connectdb;
