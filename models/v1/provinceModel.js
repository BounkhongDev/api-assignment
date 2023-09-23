const db = require("../../configs/v1/dbConnect");

module.exports = {
  getData: (limit, offset) => {
    return new Promise(async (resolve, reject) => {
      let con;
      try {
        con = await db.getConnection();
        let getData = await con.query(
          "SELECT pro_id,pro_name FROM tbProvince WHERE stt=1 LIMIT ? OFFSET ?",
          [limit, offset]
        );
        resolve(getData);
      } catch (error) {
        reject(error);
      } finally {
        if (con) con.end();
      }
    });
  },
  getDataById: (pro_id) => {
    return new Promise(async (resolve, reject) => {
      let con;
      try {
        con = await db.getConnection();
        let getDataById = await con.query(
          "SELECT pro_id,pro_name FROM tbProvince WHERE stt=1 AND pro_id=?",
          [pro_id]
        );
        resolve(getDataById);
      } catch (error) {
        reject(error);
      } finally {
        if (con) con.end();
      }
    });
  },
  insert: (pro_name) => {
    return new Promise(async (resolve, reject) => {
      let con;
      try {
        con = await db.getConnection();
        let insert = await con.query(
          "INSERT INTO tbProvince(pro_name) VALUES (?)",
          [pro_name]
        );
        resolve(insert);
      } catch (error) {
        reject(error);
      } finally {
        if (con) con.end();
      }
    });
  },

  update: (pro_name, pro_id) => {
    return new Promise(async (resolve, reject) => {
      let con;
      try {
        con = await db.getConnection();
        let update = await con.query(
          "UPDATE tbProvince SET pro_name=? WHERE pro_id=?",
          [pro_name, pro_id]
        );
        resolve(update);
      } catch (error) {
        reject(error);
      } finally {
        if (con) con.end();
      }
    });
  },

  delete: (pro_id) => {
    return new Promise(async (resolve, reject) => {
      let con;
      try {
        con = await db.getConnection();
        let del = await con.query(
          "UPDATE tbProvince SET stt=0 WHERE pro_id=?",
          [pro_id]
        );
        resolve(del);
      } catch (error) {
        reject(error);
      } finally {
        if (con) con.end();
      }
    });
  },
};
