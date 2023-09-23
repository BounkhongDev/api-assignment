const userModel = require("../../models/v1/userModel");
const bcrypt = require("bcrypt");
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
      let resultGetData = await userModel.getData(data.limit, data.offset);
      res.json(resultGetData);
    } catch (error) {
      res.status(500).json({ e: "E0" });
    }
  },
  getDataByUid: async (req, res) => {
    try {
      const schema = {
        type: "object",
        properties: {
          uid: { type: "integer" },
        },
        required: ["uid"],
        additionalProperties: false,
      };
      const validate = ajv.compile(schema);
      const data = {
        uid: parseInt(req.params.uid),
      };
      const valid = validate(data);
      // C0DE: 400 INVALID VALUES
      if (!valid) return res.status(400).json("Invalid value");

      //get data by uid
      let resultGetDataByUid = await userModel.getDataByUid(data.uid);
      res.json(resultGetDataByUid);
    } catch (error) {
      res.status(500).json({ e: "E0" });
    }
  },
  update: async (req, res) => {
    try {
      const schema = {
        type: "object",
        properties: {
          name: { type: "string" },
          surname: { type: "string" },
          gender: { enum: ["f", "m"] },
          username: { type: "string" },
          pwd: { type: "string" },
          uid: { type: "integer" },
        },
        required: ["name", "surname", "gender", "username", "pwd", "uid"],
        additionalProperties: false,
      };
      const validate = ajv.compile(schema);
      const data = {
        name: req.body.name,
        surname: req.body.surname,
        gender: req.body.gender,
        username: req.body.username,
        pwd: req.body.pwd,
        uid: req.body.uid,
      };
      const valid = validate(data);
      // C0DE: 400 INVALID VALUES
      if (!valid) return res.status(400).json("Invalid value");

      //check uid
      let resultCheckUid = await userModel.getDataByUid(data.uid);
      if (resultCheckUid.length <= 0) return res.json({ e: "NF0" });
      //check username
      let resultCheckUserName = await userModel.getDataByUserName(
        data.username
      );
      if (resultCheckUserName.length > 0) return res.json({ e: "ALH" });

      bcrypt.hash(req.body.pwd, 10, async (err, password) => {
        if (err) {
          return res.status(500).json({
            error: err,
            custom_message: "failed to hash new user password",
          });
        } else {
          //update
          await userModel.update(
            data.name,
            data.surname,
            data.gender,
            data.username,
            password,
            data.uid
          );
          res.json("success");
        }
      });
    } catch (error) {
      res.status(500).json({ e: "E0" });
    }
  },
  delete: async (req, res) => {
    try {
      const schema = {
        type: "object",
        properties: {
          uid: { type: "integer" },
        },
        required: ["uid"],
        additionalProperties: false,
      };
      const validate = ajv.compile(schema);
      const data = {
        uid: parseInt(req.params.uid),
      };
      const valid = validate(data);
      // C0DE: 400 INVALID VALUES
      if (!valid) return res.status(400).json("Invalid value");

      //check uid
      let resultCheckUid = await userModel.getDataByUid(data.uid);
      if (resultCheckUid.length <= 0) return res.json({ e: "NF0" });

      //delete
      await userModel.delete(data.uid);
      res.json("success");
    } catch (error) {
      res.status(500).json({ e: "E0" });
    }
  },
};
