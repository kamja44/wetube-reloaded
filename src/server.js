// express import
// const express = require("express"); === import express from "express"
import express from "express";

const PORT = 4000;

const app = express();

const handleHome = (req, res) => {
  return res.send("I still love you");
};
const handleLogin = (req, res) => {
  return res.send("Login Here");
};

app.get("/", handleHome);
app.get("/login", handleLogin);

const handleListening = () =>
  console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);
// app.listen(포트번호, callback)