import express from "express";
import {
  logout,
  getEdit,
  postEdit,
  see,
  startGithubLogin,
  finishGithubLogin,
  getChangePassword,
  postChangePassword,
} from "../controllers/userController";
import {
  protectorMiddleware,
  publicOnlyMiddleware,
  avatarUpload,
} from "../middlewares";
const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware ,logout);
userRouter.route("/edit")
  .all(protectorMiddleware)
  .get(getEdit)
  .post(avatarUpload.single("avatar"), postEdit);
userRouter.route("/change-password").all(protectorMiddleware).get(getChangePassword).post(postChangePassword);
// all() <- 모든 http method에 적용할 때 사용한다.
userRouter.get("/github/start", publicOnlyMiddleware ,startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware ,finishGithubLogin);
userRouter.get("/:id", see);

export default userRouter;
