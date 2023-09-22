var express = require('express');
var router = express.Router();
router.use("/v1", require('./v1/index'));
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ API: "Test API v0.0.1", uptime: process.uptime() });
});

module.exports = router;
