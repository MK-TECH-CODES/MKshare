require("dotenv").config();
const mongoose = require("mongoose");

// Database connection
function connectdb() {
  mongoose.connect(process.env.MONGO_CONNECTION_URL, {
    // Remove deprecated options
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log("Database is connected");
  }).catch((error) => {
    console.error("Error connecting to the database:", error);
  });
}

module.exports = connectdb;
