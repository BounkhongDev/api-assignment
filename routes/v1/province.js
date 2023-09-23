const express = require("express");
const router = express.Router();
const provinceController = require("../../controllers/v1/provinceController");
const guard = require("../../middleware/v1/guard");

router.post("/getData", guard, provinceController.getData);
router.get("/getDataById/:pro_id", guard, provinceController.getDataById);
router.post("/add", guard, provinceController.insert);
router.put("/edit", guard, provinceController.update);
router.delete("/del/:pro_id", guard, provinceController.delete);

module.exports = router;
