const villageModel = require("../../models/v1/villageModel");
const districtModel = require("../../models/v1/districtModel");
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
      let resultGetData = await villageModel.getData(data.limit, data.offset);
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
          v_id: { type: "integer" },
        },
        required: ["v_id"],
        additionalProperties: false,
      };
      const validate = ajv.compile(schema);
      const data = {
        v_id: parseInt(req.params.v_id),
      };
      const valid = validate(data);
      // C0DE: 400 INVALID VALUES
      if (!valid) return res.status(400).json("Invalid value");

      //get data by id
      let resultGetDataById = await villageModel.getDataById(data.v_id);
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
          v_id: { type: "integer" },
        },
        required: ["v_id"],
        additionalProperties: false,
      };
      const validate = ajv.compile(schema);
      const data = {
        v_id: parseInt(req.params.v_id),
      };
      const valid = validate(data);
      // C0DE: 400 INVALID VALUES
      if (!valid) return res.status(400).json("Invalid value");

      //get details
      let resultGetDetails = await villageModel.getDetails(data.v_id);
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
          v_name: { type: "string" },
          dr_id: { type: "integer" },
        },
        required: ["v_name", "dr_id"],
        additionalProperties: false,
      };
      const validate = ajv.compile(schema);
      const data = {
        v_name: req.body.v_name,
        dr_id: req.body.dr_id,
      };
      const valid = validate(data);
      // C0DE: 400 INVALID VALUES
      if (!valid) return res.status(400).json("Invalid value");

      //check dr_id
      let resultCheckDrId = await districtModel.getDataById(data.dr_id);
      if (resultCheckDrId.length <= 0) return res.json({ e: "DR0" });
      //insert
      await villageModel.insert(data.v_name, data.dr_id);
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
          v_name: { type: "string" },
          dr_id: { type: "integer" },
          v_id: { type: "integer" },
        },
        required: ["v_name", "dr_id", "v_id"],
        additionalProperties: false,
      };
      const validate = ajv.compile(schema);
      const data = {
        v_name: req.body.v_name,
        dr_id: req.body.dr_id,
        v_id: req.body.v_id,
      };
      const valid = validate(data);
      // C0DE: 400 INVALID VALUES
      if (!valid) return res.status(400).json("Invalid value");

      //check dr_id
      let resultCheckDrId = await districtModel.getDataById(data.dr_id);
      if (resultCheckDrId.length <= 0) return res.json({ e: "DR0" });
      //check v_id
      let resultCheckVId = await villageModel.getDataById(data.v_id);
      if (resultCheckVId.length <= 0) return res.json({ e: "VL0" });

      //update
      await villageModel.update(data.v_name, data.dr_id, data.v_id);
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
          v_id: { type: "integer" },
        },
        required: ["v_id"],
        additionalProperties: false,
      };
      const validate = ajv.compile(schema);
      const data = {
        v_id: parseInt(req.params.v_id),
      };
      const valid = validate(data);
      // C0DE: 400 INVALID VALUES
      if (!valid) return res.status(400).json("Invalid value");

      //check v_id
      let resultCheckVId = await villageModel.getDataById(data.v_id);
      if (resultCheckVId.length <= 0) return res.json({ e: "VL0" });

      //delete
      await villageModel.delete(data.v_id);
      res.json("success");
    } catch (error) {
      res.status(500).json({ e: "E0" });
    }
  },
};
