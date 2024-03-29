require("dotenv").config();
const multer = require("multer");
const File = require("../models/file");
const router = require("express").Router();
const path = require("path");
const { v4: uuid4 } = require("uuid");
const sendMail = require("../services/emailservice");

let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniquename = `${Date.now()}-${path.extname(file.originalname)}`;
    cb(null, uniquename);
  },
});

let upload = multer({
  storage,
  limits: { fileSize: 1000000 * 100 },
}).single("myfile");

router.post("/", (req, res) => {
  //store files
  upload(req, res, async (err) => {
    // valid request
    if (!req.file) {
      return res.json({ error: "all fields are required" });
    }

    if (err) {
      return res.status(500).send({ error: err.message });
    }
    //store in db
    const file = new File({
      filename: req.file.filename,
      uuid: uuid4(),
      path: req.file.path,
      size: req.file.size,
    });
    const response = await file.save();
    return res.json({
      file: `${process.env.APP_BASE_URL}/files/${response.uuid}`,
    });
  });

  //reaponse link
});

router.post("/send", async (req, res) => {
  const { uuid, emailTo, emailFrom } = req.body;

  if (!uuid || !emailTo || !emailFrom) {
    return res.status(422).send({ error: "All fields are required." });
  }

  //Get Data from database
  const file = await File.findOne({ uuid: uuid });
  if (file.sender) {
    return res.status(422).send({ error: "Email already sent" });
  }
  file.sender = emailFrom;
  file.receiver = emailTo;
  const response = await file.save();
  // Send email
  sendMail({
    from: emailFrom,
    to: emailTo,
    subject: "MKshare file shareing",
    text: `${emailFrom} Shared file with You`,
    html: require("../services/emailtemplate")({
      emailFrom: emailFrom,
      downloadLink: `${process.env.APP_BASE_URL}/files/${file.uuid}`,
      size: parseInt(file.size / 1000) + "KB",
      expires: "24 hours",
    }),
  });
  return res.send({ success: true });
});

module.exports = router;
