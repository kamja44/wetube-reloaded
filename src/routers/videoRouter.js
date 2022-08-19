import express from "express";
import { watch, getEdit, postEdit, getUpload, postUpload, deleteVideo} from "../controllers/videoController";
import { protectorMiddleware, videoUpload } from "../middlewares";

const videoRouter = express.Router();

// (\\d+) -> regular Expression -> 숫자만 가능하게 설정

videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit")
    .all(protectorMiddleware)
    .get(getEdit)
    .post(postEdit); // get과 post를 동시에 사용
videoRouter.route("/:id([0-9a-f]{24})/delete")
    .all(protectorMiddleware)
    .get(deleteVideo);
videoRouter.route("/upload")
    .all(protectorMiddleware)
    .get(getUpload)
    .post(videoUpload.single("video"), postUpload);
    // uploadFiles.single("파일명") <- multer middleware 파일명은 input의 name

export default videoRouter;
