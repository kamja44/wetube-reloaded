// express import
// const express = require("express"); === import express from "express"
import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import globalRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";
// console.log(process.cwd()); // precess.cwd() -> 현재 작업중인 디렉토리 확인
// cwd == node.js가 실행되는 위치 == package.json 위치

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug"); // view engine을 pug로 설정하여 express에 명시한다.
app.set("views" , process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true })); // express가 form의 값을 읽을 수 있게 설정
// session은 Router 위에 정의해야한다.

app.use(session({
    // .env 파일 에 접근하기 <- process.env.변수명
    secret : process.env.COOKIE_SECRET, //sign cookie <- 우리의 backend가 cookie를 전달했음을 증명하는 sign
    resave : false,
    saveUninitialized : false, // session이 수정된 적이 없는상태 즉, 세션을 수정할 때만 세션을 DB에 저장하고 쿠키를 넘겨준다.
    // cookie : {
    //     // 1/1000초 단위
    //     // 쿠키가 살아있는 시간을 정의 20000 <- 20초
    //     maxAge : 20000,
    // },
    // .env 파일 에 접근하기 <- process.env.변수명
    store : MongoStore.create({mongoUrl : process.env.DB_URL}),
})
);

app.use(localsMiddleware);
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;