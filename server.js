const express = require("express");
const connectdb = require("./config/db");
const path = require("path");
const app = express();

const PORT = 3500 || process.env.PORT;
connectdb();
app.use(express.static("public"));
app.use(express.json())

//Template engine
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
// Router
app.use("/api/files", require("./routes/files"));
app.use("/files", require("./routes/show"));
// Download
app.use("/files/download", require("./routes/download"));

// For the server listening
app.listen(PORT, () => {
  console.log(`Server is running in the ${PORT}`);
});
