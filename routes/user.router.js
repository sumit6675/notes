const express = require("express");
const user = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { Usermodel } = require("../module/users.model");

const userRouter = express.Router();
userRouter.use(express.json());

userRouter.post("/register", async (req, res) => {
  const { email, pass, name, age } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, hash) => {
      if (err) {
        console.log("err :>> ", err);
      } else {
        console.log(hash);
        const user = new Usermodel({ email, pass: hash, name, age });
        await user.save();
        res.send("Registration Complete!");
      }
    });
  } catch (err) {
    console.log("err in register:>> ", err);
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await Usermodel.find({ email });
    // console.log(user)
    if (user.length > 0) {
      bcrypt.compare(pass, user[0].pass, (err, result) => {
        if (result) {
          const token = jwt.sign(
            {
              exp: Math.floor(Date.now() / 1000) + 60 * 60,
              userId: user[0]._id,
            },
            'sumit'
          );
          console.log(result);
          res.send({ "msg": "Loggin Successful", "token": token });
        } else {
          console.log(result);
          res.send("Wrong password");
        }
      });
    } else {
      res.send("Loggin Failure");
    }
  } catch (err) {
    console.log("err in login post req :>> ", err);
  }
});

module.exports = userRouter;
