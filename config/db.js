require("dotenv").config();
const mongoose = require("mongoose");

// Database connection
function connectdb() {
  mongoose
    .connect(process.env.MONGO_CONNECTION_URL, {
      // Remove deprecated options
      useNewUrlParser: true, // Deprecated but still needed for backward compatibility
      useUnifiedTopology: true, // Deprecated, but should be explicitly set to true
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log("Database is connected");
    })
    .catch((error) => {
      console.error("Error connecting to the database:", error);
    });
}

module.exports = connectdb;
