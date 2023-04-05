const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require('dotenv').config();
const { response } = require("express");

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
db.connect((err) => {
  if (err) {
    console.log("Database Connection Failed !!!", err);
  } else {
    console.log("connected to Database");
  }
});





app.post("/register", (req, respo) => {
  const username = req.body.user;
  const password = req.body.pwd;
  //   res.send();
  // console.log(username);
  db.query("SELECT * FROM users Where Username = ?", [username], (err, res) => {
    // console.log(ret);
    if (err) {
      console.log("An error occured: ", err.message);
      respo
        .status(500)
        .json({ status: 500, message: "An error occured: " + err.message });
    } else {
      if (res.length) {
        console.log("User found successfully.");
        console.log(JSON.stringify(res));
        respo
          .status(409)
          .json({ status: 409, message: "User found successfully." });
      } else {
        console.log("User not found.");
        respo.status(404).send({ status: 404, message: "User not found." });
        db.query(
          "INSERT INTO users (Username,Password) VALUES (?,?)",
          [username, password],
          (err, result) => {
            console.log(err);
          }
        );
      }
    }
  });
  // db.query(
  //   "INSERT INTO users (Username,Password) VALUES (?,?)",
  //   [username, password],
  //   (err, result) => {
  //     console.log(err);
  //   }
  // );
});

app.post("/uploadprop",(req,respp)=>{
  const type = req.body.propType
  if (type === "Select the property type") {
    console.log("empty");
    respp.status(411).json({status:411, message:"Please fill"})
    // console.log(respp);
  }else{
  db.query(
    "SELECT * FROM props WHERE type= ?",[type],(err, result) => {
      if (err) {
        console.log("An error occured: ", err.message);
        respp
          .status(500)
          .json({ status: 500, message: "An error occured: " + err.message });
      }else{
        if(result.length >0){
          console.log("Property found successfully.");
        // console.log(JSON.stringify(result));
        respp
          .status(409)
          .json({ status: 409, message: "User found successfully." });
        }else{
          console.log("Property not found.");
          respp.status(400).send({ status: 400, message: "Property not found." });
          db.query(
            "INSERT INTO props (type) VALUES (?)",
            [type],
            (err, result) => {
              console.log(err);
              // console.log(respp.length);
            }
          );
        }
      }
      // console.log(type);
    }
    
  );
}
})

app.post("/login",(req,respo)=>{

  const username = req.body.user;
  const password = req.body.pwd;
    // respo.send();
  // console.log(username);
db.query("SELECT * FROM users where Username = ? AND Password = ?",  [username, password],(err,result)=>{
  if (err) {
    console.log("An error occured: ", err.message);
    respo
      .status(500)
      .json({ status: 500, message: "An error occured: " + err.message });
  } else {
    if (result.length) {
      console.log("User found successfully.");
      console.log(result);
      respo
        .status(200)
        .json({ status: 200, message: "User found successfully.",name:username});
    } else {
      console.log("User not found.");
      respo.status(400).send({ status: 400, message: "Wrong username or password." });
      
      // db.query(
      //   "INSERT INTO users (Username,Password) VALUES (?,?)",
      //   [username, password],
      //   (err, result) => {
      //     console.log(err);
      //   }
      // );
    }
  }
})
})

const port = process.env.PORT || 3001;
app.listen({port, host: "0.0.0.0" },() => {
  console.log(`Server running on port ${port}`);
});