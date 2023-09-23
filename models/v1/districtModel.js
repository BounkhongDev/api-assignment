const db = require("../../configs/v1/dbConnect");

module.exports = {
  getData: (limit, offset) => {
    return new Promise(async (resolve, reject) => {
      let con;
      try {
        con = await db.getConnection();
        let getData = await con.query(
          "SELECT dr_id,dr_name FROM tbDistrict WHERE stt=1 LIMIT ? OFFSET ?",
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
  getDataById: (dr_id) => {
    return new Promise(async (resolve, reject) => {
      let con;
      try {
        con = await db.getConnection();
        let getDataById = await con.query(
          "SELECT dr_id,dr_name FROM tbDistrict WHERE stt=1 AND dr_id=?",
          [dr_id]
        );
        resolve(getDataById);
      } catch (error) {
        reject(error);
      } finally {
        if (con) con.end();
      }
    });
  },
  getDetails: (dr_id) => {
    return new Promise(async (resolve, reject) => {
      let con;
      try {
        con = await db.getConnection();
        let getDetails = await con.query(
          `SELECT d.dr_id,d.pro_id,d.dr_name,p.pro_name 
           FROM tbDistrict d
           INNER JOIN tbProvince p ON
           p.pro_id = d.pro_id
           WHERE d.stt=1 AND d.dr_id=?`,
          [dr_id]
        );
        resolve(getDetails);
      } catch (error) {
        reject(error);
      } finally {
        if (con) con.end();
      }
    });
  },
  insert: (dr_name, pro_id) => {
    return new Promise(async (resolve, reject) => {
      let con;
      try {
        con = await db.getConnection();
        let insert = await con.query(
          "INSERT INTO tbDistrict(dr_name,pro_id) VALUES (?,?)",
          [dr_name, pro_id]
        );
        resolve(insert);
      } catch (error) {
        reject(error);
      } finally {
        if (con) con.end();
      }
    });
  },

  update: (dr_name, pro_id, dr_id) => {
    return new Promise(async (resolve, reject) => {
      let con;
      try {
        con = await db.getConnection();
        let update = await con.query(
          "UPDATE tbDistrict SET dr_name=?,pro_id=? WHERE dr_id=?",
          [dr_name, pro_id, dr_id]
        );
        resolve(update);
      } catch (error) {
        reject(error);
      } finally {
        if (con) con.end();
      }
    });
  },

  delete: (dr_id) => {
    return new Promise(async (resolve, reject) => {
      let con;
      try {
        con = await db.getConnection();
        let del = await con.query("UPDATE tbDistrict SET stt=0 WHERE dr_id=?", [
          dr_id,
        ]);
        resolve(del);
      } catch (error) {
        reject(error);
      } finally {
        if (con) con.end();
      }
    });
  },
};
