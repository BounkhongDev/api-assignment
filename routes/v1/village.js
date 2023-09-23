const express = require("express");
const router = express.Router();
const villageController = require("../../controllers/v1/villageController");
const guard = require("../../middleware/v1/guard");

router.post("/getData", guard, villageController.getData);
router.get("/getDataById/:v_id", guard, villageController.getDataById);
router.get("/details/:v_id", guard, villageController.getDetails);
router.post("/add", guard, villageController.insert);
router.put("/edit", guard, villageController.update);
router.delete("/del/:v_id", guard, villageController.delete);

module.exports = router;
