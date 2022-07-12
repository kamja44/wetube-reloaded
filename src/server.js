// express import
// const express = require("express"); === import express from "express"
import express from "express";
import morgan from "morgan";

const PORT = 4000;

const app = express();

const logger = morgan("dev");

const handleHome = (req, res) => {
    console.log("console answering")
  return res.send("I love middleware");
};
const handlelogin = (req, res) =>{
    return res.send("login");
}

// app.use -> global router -> 어떠한 url에서도 동작하는 middleWare
// global router가 먼저 오고 그 후 router가 온다.
app.use(logger);
app.get("/",handleHome);
app.get("/login", handlelogin);

const handleListening = () =>
  console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);
// app.listen(포트번호, callback)
