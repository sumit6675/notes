const express = require("express");
const { connection } = require("./config/db");
const userRouter=require("./routes/user.router")
const noteRouter=require("./routes/notes.router");
const authenticate = require("./middlewere/auth.middlewere");
require("dotenv").config()
const app = express();
app.use(express.json())
app.use("/user",userRouter)
app.use(authenticate)
app.use("/notes",noteRouter)



app.get("/", (req, res) => {
  res.send("HELLO!");
});

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (err) {
    console.log("err connecting to db :>> ", err);
  }
  console.log(`Listening on ${process.env.port}`);
});
