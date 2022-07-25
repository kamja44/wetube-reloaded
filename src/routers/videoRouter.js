import express from "express";
import { watch, getEdit, postEdit, getUpload, postUpload } from "../controllers/videoController";

const videoRouter = express.Router();

// (\\d+) -> regular Expression -> 숫자만 가능하게 설정

videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit); // get과 post를 동시에 사용
videoRouter.route("/upload").get(getUpload).post(postUpload);

export default videoRouter;
