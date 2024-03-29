const express = require("express");
const connectdb = require("./config/db");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000; // Adjust the order to prioritize environment variables

// Connect to MongoDB
connectdb(() => {
  // MongoDB connection successful, start the server
  app.use(express.static("public"));
  app.use(express.json());

  // Template engine
  app.set("views", path.join(__dirname, "/views"));
  app.set("view engine", "ejs");

  // Routes
  app.use("/api/files", require("./routes/files"));
  app.use("/files", require("./routes/show"));
  app.use("/files/download", require("./routes/download"));

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
