const userModel = require("../../models/v1/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Ajv = require("ajv");
const ajv = new Ajv();

module.exports = {
  register: async (req, res) => {
    try {
      const schema = {
        type: "object",
        properties: {
          name: { type: "string" },
          surname: { type: "string" },
          gender: { enum: ["f", "m"] },
          username: { type: "string" },
          pwd: { type: "string" },
        },
        required: ["name", "surname", "gender", "username", "pwd"],
        additionalProperties: false,
      };
      const validate = ajv.compile(schema);
      const data = {
        name: req.body.name,
        surname: req.body.surname,
        gender: req.body.gender,
        username: req.body.username,
        pwd: req.body.pwd,
      };
      const valid = validate(data);
      // C0DE: 400 INVALID VALUES
      if (!valid) return res.status(400).json("Invalid value");

      //check username
      let resultCheckUserName = await userModel.getDataByUserName(
        data.username
      );
      if (resultCheckUserName.length > 0) return res.json({ e: "ALH" });

      bcrypt.hash(data.pwd, 10, async (err, password) => {
        if (err) {
          return res.status(500).json({
            error: err,
            custom_message: "failed to hash new user password",
          });
        } else {
          //save users
          await userModel.insert(
            data.name,
            data.surname,
            data.gender,
            data.username,
            password
          );
          res.json("success");
        }
      });
    } catch (error) {
      res.status(500).json({ e: "E0" });
    }
  },

  login: async (req, res) => {
    try {
      const schema = {
        type: "object",
        properties: {
          username: { type: "string" },
          pwd: { type: "string" },
        },
        required: ["username", "pwd"],
        additionalProperties: false,
      };
      const validate = ajv.compile(schema);
      const data = {
        username: req.body.username,
        pwd: req.body.pwd,
      };
      const valid = validate(data);
      // C0DE: 400 INVALID VALUES
      if (!valid) return res.status(400).json("Invalid value");

      //get user information from
      let resultGetUserInfor = await userModel.getDataByUserName(data.username);
      if (resultGetUserInfor.length <= 0) return res.json({ e: "NF0" });

      bcrypt.compare(
        req.body.pwd,
        resultGetUserInfor[0].pwd,
        (err, success) => {
          if (err) {
            return res.status(401).json({
              e: "Auth failed",
            });
          }
          if (success) {
            token = jwt.sign(
              { uid: resultGetUserInfor[0].uid },
              process.env.SECRET,
              {
                expiresIn: process.env.EXT_TIME,
              }
            );
            return res.status(200).json({
              token,
            });
          }
          res.status(204).json({
            e: "Auth failed",
          });
        }
      );
    } catch (error) {
      res.status(500).json({ e: "E0" });
    }
  },
};
