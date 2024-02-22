var mysql = require('mysql');

var db_conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ""
});

db_conn.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");
});

module.exports = {db_conn};
