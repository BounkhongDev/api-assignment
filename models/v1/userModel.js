const db = require("../../configs/v1/dbConnect");

module.exports = {
  getData: (limit, offset) => {
    return new Promise(async (resolve, reject) => {
      let con;
      try {
        con = await db.getConnection();
        let getData = await con.query(
          "SELECT uid,name,surname,gender FROM tbUsers WHERE stt=1 LIMIT ? OFFSET ?",
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
  getDataByUid: (uid) => {
    return new Promise(async (resolve, reject) => {
      let con;
      try {
        con = await db.getConnection();
        let getData = await con.query(
          "SELECT uid,name,surname,gender FROM tbUsers WHERE stt=1 AND uid=?",
          [uid]
        );
        resolve(getData);
      } catch (error) {
        reject(error);
      } finally {
        if (con) con.end();
      }
    });
  },
  getDataByUserName: (username) => {
    return new Promise(async (resolve, reject) => {
      let con;
      try {
        con = await db.getConnection();
        let getDataByUserName = await con.query(
          "SELECT * FROM tbUsers WHERE stt=1 AND username=?",
          [username]
        );
        resolve(getDataByUserName);
      } catch (error) {
        reject(error);
      } finally {
        if (con) con.end();
      }
    });
  },

  update: (name, surname, gender, username, pwd, uid) => {
    return new Promise(async (resolve, reject) => {
      let con;
      try {
        con = await db.getConnection();
        let update = await con.query(
          "UPDATE tbUsers SET name=?,surname=?,gender=?,username=?,pwd=? WHERE uid=?",
          [name, surname, gender, username, pwd, uid]
        );
        resolve(update);
      } catch (error) {
        reject(error);
      } finally {
        if (con) con.end();
      }
    });
  },

  insert: (name, surname, gender, username, pwd) => {
    return new Promise(async (resolve, reject) => {
      let con;
      try {
        con = await db.getConnection();
        let insert = await con.query(
          "INSERT INTO tbUsers(name,surname,gender,username,pwd) VALUES (?,?,?,?,?)",
          [name, surname, gender, username, pwd]
        );
        resolve(insert);
      } catch (error) {
        reject(error);
      } finally {
        if (con) con.end();
      }
    });
  },

  delete: (uid) => {
    return new Promise(async (resolve, reject) => {
      let con;
      try {
        con = await db.getConnection();
        let del = await con.query("UPDATE tbUsers SET stt=0 WHERE uid=?", [
          uid,
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
