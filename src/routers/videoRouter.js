import express from "express";
import {watch, edit, upload, deleteVideo} from "../controllers/videoController";

const videoRouter = express.Router();

// (\\d+) -> regular Expression -> 숫자만 가능하게 설정
videoRouter.get("/upload", upload);
videoRouter.get("/:id(\\d+)", watch);
videoRouter.get("/:id(\\d+)/edit", edit);
videoRouter.get("/:id(\\d+)/delete", deleteVideo);

export default videoRouter;