const router = require("express").Router();
const File = require("../models/file");

router.get("/:uuid", async (req, res) => {
  try {
    const file = await File.findOne({ uuid: req.params.uuid });
    if (!file) {
      return res.render("download", { error: "Link is expried." });
    }
    return res.render("download", {
      uuid: file.uuid,
      filename: file.filename,
      filesize: file.size,
      downloadlink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`,
      //http:localhost/3500/file/download/sdknk-jskjkwndkwn
    });
  } catch (err) {
    return res.render("download", { error: "Something went wrong. " });
  }
});

module.exports = router;
