const express = require("express");
const router = express.Router();
const districtController = require("../../controllers/v1/districtController");
const guard = require("../../middleware/v1/guard");

router.post("/getData", guard, districtController.getData);
router.get("/getDataById/:dr_id", guard, districtController.getDataById);
router.get("/details/:dr_id", guard, districtController.getDetails);
router.post("/add", guard, districtController.insert);
router.put("/edit", guard, districtController.update);
router.delete("/del/:dr_id", guard, districtController.delete);

module.exports = router;
