const express = require("express");
const router = express.Router();
const userController = require("../../controllers/v1/userController");
const guard = require("../../middleware/v1/guard");

router.post("/getData", guard, userController.getData);
router.get("/getDataByUid/:uid", guard, userController.getDataByUid);
router.put("/edit", guard, userController.update);
router.delete("/del/:uid", guard, userController.delete);

module.exports = router;
