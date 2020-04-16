const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Get is working..!!");
});

module.exports = router;
