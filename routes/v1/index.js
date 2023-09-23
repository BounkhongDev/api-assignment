var express = require("express");
var router = express.Router();

router.use("/auth", require("./auth"));
router.use("/user", require("./user"));
router.use("/province", require("./province"));
router.use("/district", require("./district"));
router.use("/village", require("./village"));

module.exports = router;
