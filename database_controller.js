const SalesDAO = require("./dao/sales_dao.js");
class DbCtl {
  static async postUser(req, res) {
    try {
      var new_user = {};
      new_user.fullname = req.body.fullname;
      //new_user.fullname = new_user.fullname.replace(/[^a-zA-Z ]/g, "");
      new_user.email = req.body.email;
      new_user.password = req.body.password;
      new_user.phone = req.body.phone;
      new_user.amount = req.body.amount;
      //new_user.date = req.body.date;
      console.log(new_user);
      await SalesDAO.addUser(new_user).then((data) => {
      // console.log("database controller:", db_response)
      res.status(200).json({ success: "signup successful" });
      });
    } catch (e) {
      console.error("Error ocurred:", e.message);
      res.status(500).json({ error: e.message});
    }
  }
  static async getUser(req, res) {
    try {
      var user = {};
      user.email = req.body.email;
      user.password = req.body.password;
      await SalesDAO.getUser(user).then((data) => {
        console.log(data);
        res.status(200).json(data);
      });
    } catch (e) {
      console.error("Error ocurred:", e.message);
      res.status(500).json({ error: "username or password incorrect" });
    }
  }
  static async modifyUser(req, res) {
    try {
      var new_user = {};
      //new_user.fullname = req.body.fullname;
      //new_user.fullname = new_user.fullname.replace(/[^a-zA-Z ]/g, "");
      new_user.email = req.body.email;
      new_user.password = req.body.password;
      //new_user.phone = req.body.phone;
      new_user.amount = req.body.amount;
      //new_user.date = req.body.date;
      await SalesDAO.modifyUser(new_user).then((data) => {
      // console.log("database controller:", db_response)
      res.status(200).json({ success: "update successful" });
    });
    } catch (e) {
      console.error("Error ocurred:", e.message);
      res.status(500).json({ error: "Failed to update" });
    }
  }
}
module.exports = DbCtl;
