// express import
// const express = require("express"); === import express from "express"
import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const PORT = 4000;

console.log(process.cwd()); // precess.cwd() -> 현재 작업중인 디렉토리 확인
// cwd == node.js가 실행되는 위치 == package.json 위치

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug"); // view engine을 pug로 설정하여 express에 명시한다.
app.set("views",process.cwd() + "/src/views");
app.use(logger);
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

const handleListening = () =>
  console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);
// app.listen(포트번호, callback)
