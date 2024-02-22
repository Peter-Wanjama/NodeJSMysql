var express = require("express");
const DbCtl = require("./database_controller");
var app = express();

const db_conn = require("./config/db_config").db_conn; //Database connection object
app.disable("x-powered-by");

var handlebars = require("express-handlebars").create({
  defaultLayout: "main",
});

app.use(require("body-parser").urlencoded({ extended: true })); //parse form data

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

app.set("port", process.env.PORT || 3000);
app.use(express.static(__dirname + "/public"));

var sql = "Select * from loanappdb.loanappusers;";
var db_result;
app.get('/' , (req , res)=>{

   res.render('home')

})
app.get('/signin' , (req , res)=>{

   res.render('signin')

})
app.get('/signup' , (req , res)=>{

   res.render('signup')

})
app.post("/process", function (req, res) {
  console.log(req.query.form);
  switch (req.query.form) {
    case 'signin':
      DbCtl.getUser(req,res);
      break;
    case 'signup':
      DbCtl.postUser(req,res);
      break;
    default:
      break;
  }
});

app.listen(app.get("port"), () => {
  console.log(
    `Express Server started on port \nhttp://localhost:` +
      app.get("port") +
      `\nPress Ctrl+C to stop`
  );
});
