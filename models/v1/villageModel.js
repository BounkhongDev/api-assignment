const db = require("../../configs/v1/dbConnect");

module.exports = {
  getData: (limit, offset) => {
    return new Promise(async (resolve, reject) => {
      let con;
      try {
        con = await db.getConnection();
        let getData = await con.query(
          "SELECT v_id,v_name FROM tbVillage WHERE stt=1 LIMIT ? OFFSET ?",
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
  getDataById: (v_id) => {
    return new Promise(async (resolve, reject) => {
      let con;
      try {
        con = await db.getConnection();
        let getDataById = await con.query(
          "SELECT v_id,v_name FROM tbVillage WHERE stt=1 AND v_id=?",
          [v_id]
        );
        resolve(getDataById);
      } catch (error) {
        reject(error);
      } finally {
        if (con) con.end();
      }
    });
  },
  getDetails: (v_id) => {
    return new Promise(async (resolve, reject) => {
      let con;
      try {
        con = await db.getConnection();
        let getDetails = await con.query(
          `SELECT v.v_id,v.dr_id,v.v_name,d.pro_id,d.dr_name,p.pro_name 
           FROM tbVillage v
           INNER JOIN tbDistrict d ON
            v.dr_id = d.dr_id
           INNER JOIN tbProvince p ON
            p.pro_id = d.pro_id
           WHERE v.stt=1 AND v.v_id=1;`,
          [v_id]
        );
        resolve(getDetails);
      } catch (error) {
        reject(error);
      } finally {
        if (con) con.end();
      }
    });
  },
  insert: (v_name, dr_id) => {
    return new Promise(async (resolve, reject) => {
      let con;
      try {
        con = await db.getConnection();
        let insert = await con.query(
          "INSERT INTO tbVillage(v_name,dr_id) VALUES (?,?)",
          [v_name, dr_id]
        );
        resolve(insert);
      } catch (error) {
        reject(error);
      } finally {
        if (con) con.end();
      }
    });
  },

  update: (v_name, dr_id, v_id) => {
    return new Promise(async (resolve, reject) => {
      let con;
      try {
        con = await db.getConnection();
        let update = await con.query(
          "UPDATE tbVillage SET v_name=?,dr_id=? WHERE v_id=?",
          [v_name, dr_id, v_id]
        );
        resolve(update);
      } catch (error) {
        reject(error);
      } finally {
        if (con) con.end();
      }
    });
  },

  delete: (v_id) => {
    return new Promise(async (resolve, reject) => {
      let con;
      try {
        con = await db.getConnection();
        let del = await con.query("UPDATE tbVillage SET stt=0 WHERE v_id=?", [
          v_id,
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
