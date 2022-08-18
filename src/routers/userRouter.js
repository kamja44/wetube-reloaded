import express from "express";
import {
  logout,
  getEdit,
  postEdit,
  see,
  startGithubLogin,
  finishGithubLogin,
} from "../controllers/userController";
import {
  protectorMiddleware,
  publicOnlyMiddleware
} from "../middlewares";
const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware ,logout);
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
// all() <- 모든 http method에 적용할 때 사용한다.
userRouter.get("/github/start", publicOnlyMiddleware ,startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware ,finishGithubLogin);
userRouter.get(":id", see);

export default userRouter;
