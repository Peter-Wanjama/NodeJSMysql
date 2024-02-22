const db_conn = require("../config/db_config").db_conn; //Database connection object
class SalesDAO {
  static async addUser(user) {
    const customPromise = new Promise((resolve, reject) => {
      //var sql ="INSERT INTO loanappdb.loanappusers VALUES (NULL, 'Loise Wanjiru', 'loiseciru@gmail.com', '123456.', '713826384', '3500', '2024-02-21 01:14:16');";
      var sql = `INSERT INTO loanappdb.loanappusers VALUES (NULL,'${user.fullname}', '${user.email}', '${user.password}', '${user.phone}', '${user.amount}',NULL);`;
      db_conn.query(sql, function (err, result) {
        if (err) {
          console.log("Error cause:" + err.sqlMessage);
          reject(new Error(err.sqlMessage));
        }
          console.log("1 record inserted, ID: ");
          console.log(result);
          resolve("Success record inserted");
      });
    });
    return customPromise;
  }
  static async getUser(user) {
    const customPromise = new Promise((resolve, reject) => {
      db_conn.query(
        `SELECT * FROM loanappdb.loanappusers WHERE email = '${user.email}' and password='${user.password}';`,
        function (err, result) {
          if (err) throw err;
          if (result.length) resolve(result);
          else reject(new Error("username or password incorrect"));
        }
      );
    });
    return customPromise;
  }
  static async modifyUser(user) {
    const customPromise = new Promise((resolve, reject) => {
      //check if user exists
      db_conn.query(
        `SELECT * FROM loanappdb.loanappusers WHERE email = '${user.email}';`,
        function (err_, res) {
          if (err_) throw err_;
          if (res.length) {
            var sql = `UPDATE loanappdb.loanappusers SET amount = '${user.amount}' WHERE email = '${user.email}';`;
            db_conn.query(sql, function (err, result) {
              if (err) throw err;
              console.log(result);
              if (result.length) resolve("Success update --");
            });
          } else reject(new Error("Email not found"));
        }
      );
    });
    return customPromise;
  }
}

module.exports = SalesDAO;
