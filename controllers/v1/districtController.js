const districtModel = require("../../models/v1/districtModel");
const provinceModel = require("../../models/v1/provinceModel");
const Ajv = require("ajv");
const ajv = new Ajv();

module.exports = {
  getData: async (req, res) => {
    try {
      const schema = {
        type: "object",
        properties: {
          limit: { type: "integer" },
          offset: { type: "integer" },
        },
        required: ["limit", "offset"],
        additionalProperties: false,
      };
      const validate = ajv.compile(schema);
      const data = {
        limit: req.body.limit,
        offset: req.body.offset,
      };
      const valid = validate(data);
      // C0DE: 400 INVALID VALUES
      if (!valid) return res.status(400).json("Invalid value");

      //get data
      let resultGetData = await districtModel.getData(data.limit, data.offset);
      res.json(resultGetData);
    } catch (error) {
      res.status(500).json({ e: "E0" });
    }
  },
  getDataById: async (req, res) => {
    try {
      const schema = {
        type: "object",
        properties: {
          dr_id: { type: "integer" },
        },
        required: ["dr_id"],
        additionalProperties: false,
      };
      const validate = ajv.compile(schema);
      const data = {
        dr_id: parseInt(req.params.dr_id),
      };
      const valid = validate(data);
      // C0DE: 400 INVALID VALUES
      if (!valid) return res.status(400).json("Invalid value");

      //get data by id
      let resultGetDataById = await districtModel.getDataById(data.dr_id);
      res.json(resultGetDataById);
    } catch (error) {
      res.status(500).json({ e: "E0" });
    }
  },
  getDetails: async (req, res) => {
    try {
      const schema = {
        type: "object",
        properties: {
          dr_id: { type: "integer" },
        },
        required: ["dr_id"],
        additionalProperties: false,
      };
      const validate = ajv.compile(schema);
      const data = {
        dr_id: parseInt(req.params.dr_id),
      };
      const valid = validate(data);
      // C0DE: 400 INVALID VALUES
      if (!valid) return res.status(400).json("Invalid value");

      //get details
      let resultGetDetails = await districtModel.getDetails(data.dr_id);
      res.json(resultGetDetails);
    } catch (error) {
      res.status(500).json({ e: "E0" });
    }
  },
  insert: async (req, res) => {
    try {
      const schema = {
        type: "object",
        properties: {
          dr_name: { type: "string" },
          pro_id: { type: "integer" },
        },
        required: ["dr_name", "pro_id"],
        additionalProperties: false,
      };
      const validate = ajv.compile(schema);
      const data = {
        dr_name: req.body.dr_name,
        pro_id: req.body.pro_id,
      };
      const valid = validate(data);
      // C0DE: 400 INVALID VALUES
      if (!valid) return res.status(400).json("Invalid value");

      //check pro_id
      let resultCheckProId = await provinceModel.getDataById(data.pro_id);
      if (resultCheckProId.length <= 0) return res.json({ e: "PV0" });
      //insert
      await districtModel.insert(data.dr_name, data.pro_id);
      res.json("success");
    } catch (error) {
      res.status(500).json({ e: "E0" });
    }
  },

  update: async (req, res) => {
    try {
      const schema = {
        type: "object",
        properties: {
          dr_name: { type: "string" },
          pro_id: { type: "integer" },
          dr_id: { type: "integer" },
        },
        required: ["dr_name", "pro_id", "dr_id"],
        additionalProperties: false,
      };
      const validate = ajv.compile(schema);
      const data = {
        dr_name: req.body.dr_name,
        pro_id: req.body.pro_id,
        dr_id: req.body.dr_id,
      };
      const valid = validate(data);
      // C0DE: 400 INVALID VALUES
      if (!valid) return res.status(400).json("Invalid value");

      //check pro_id
      let resultCheckProId = await provinceModel.getDataById(data.pro_id);
      if (resultCheckProId.length <= 0) return res.json({ e: "PV0" });
      //check dr_id
      let resultCheckDrId = await provinceModel.getDataById(data.pro_id);
      if (resultCheckDrId.length <= 0) return res.json({ e: "DR0" });

      //update
      await districtModel.update(data.dr_name, data.pro_id, data.dr_id);
      res.json("success");
    } catch (error) {
      res.status(500).json({ e: "E0" });
    }
  },

  delete: async (req, res) => {
    try {
      const schema = {
        type: "object",
        properties: {
          dr_id: { type: "integer" },
        },
        required: ["dr_id"],
        additionalProperties: false,
      };
      const validate = ajv.compile(schema);
      const data = {
        dr_id: parseInt(req.params.dr_id),
      };
      const valid = validate(data);
      // C0DE: 400 INVALID VALUES
      if (!valid) return res.status(400).json("Invalid value");

      //delete
      await districtModel.delete(data.dr_id);
      res.json("success");
    } catch (error) {
      res.status(500).json({ e: "E0" });
    }
  },
};
