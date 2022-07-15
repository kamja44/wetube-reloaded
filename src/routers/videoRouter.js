import express from "express";
import {watch, getEdit, postEdit} from "../controllers/videoController";

const videoRouter = express.Router();

// (\\d+) -> regular Expression -> 숫자만 가능하게 설정

videoRouter.get("/:id(\\d+)", watch);
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit); // get과 post를 동시에 사용
// videoRouter.get("/:id(\\d+)/edit", getEdit);
// videoRouter.post("/:id(\\d+)/edit", postEdit);


export default videoRouter;