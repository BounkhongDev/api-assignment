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
      let resultGetData = await provinceModel.getData(data.limit, data.offset);
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
          pro_id: { type: "integer" },
        },
        required: ["pro_id"],
        additionalProperties: false,
      };
      const validate = ajv.compile(schema);
      const data = {
        pro_id: parseInt(req.params.pro_id),
      };
      const valid = validate(data);
      // C0DE: 400 INVALID VALUES
      if (!valid) return res.status(400).json("Invalid value");

      //get data by id
      let resultGetDataById = await provinceModel.getDataById(data.pro_id);
      res.json(resultGetDataById);
    } catch (error) {
      res.status(500).json({ e: "E0" });
    }
  },
  insert: async (req, res) => {
    try {
      const schema = {
        type: "object",
        properties: {
          pro_name: { type: "string" },
        },
        required: ["pro_name"],
        additionalProperties: false,
      };
      const validate = ajv.compile(schema);
      const data = {
        pro_name: req.body.pro_name,
      };
      const valid = validate(data);
      // C0DE: 400 INVALID VALUES
      if (!valid) return res.status(400).json("Invalid value");

      //insert
      await provinceModel.insert(data.pro_name);
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
          pro_name: { type: "string" },
          pro_id: { type: "integer" },
        },
        required: ["pro_name", "pro_id"],
        additionalProperties: false,
      };
      const validate = ajv.compile(schema);
      const data = {
        pro_name: req.body.pro_name,
        pro_id: req.body.pro_id,
      };
      const valid = validate(data);
      // C0DE: 400 INVALID VALUES
      if (!valid) return res.status(400).json("Invalid value");

      //check pro_id
      let resultCheckProId = await provinceModel.getDataById(data.pro_id);
      if (resultCheckProId.length <= 0) return res.json({ e: "PV0" });
      //update
      await provinceModel.update(data.pro_name, data.pro_id);
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
          pro_id: { type: "integer" },
        },
        required: ["pro_id"],
        additionalProperties: false,
      };
      const validate = ajv.compile(schema);
      const data = {
        pro_id: parseInt(req.params.pro_id),
      };
      const valid = validate(data);
      // C0DE: 400 INVALID VALUES
      if (!valid) return res.status(400).json("Invalid value");
      //check pro_id
      let resultCheckProId = await provinceModel.getDataById(data.pro_id);
      if (resultCheckProId.length <= 0) return res.json({ e: "PV0" });

      //delete
      await provinceModel.delete(data.pro_id);
      res.json("success");
    } catch (error) {
      res.status(500).json({ e: "E0" });
    }
  },
};
