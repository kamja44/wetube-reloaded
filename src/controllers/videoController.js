import Video from "../models/Video";
import User from "../models/User";
// Video.find({},(error, videos) => {}); <- callback function

export const home = async (req, res) => {
  // {} <- search terms 비어있으면 모든 형식을 찾는다. 즉, 모든 형태의 Video를 찾는다
  const videos = await Video.find({}).sort({ createdAt: "desc" }).populate("owner");
  return res.render("home", { pageTitle: "Home", videos });
};

export const watch = async (req, res) => {
  // const id = req.params.id; 코드와 const {id} = req.params; 코드는 동일하다.
  const { id } = req.params;
  // console.log(video);
  const video = await Video.findById(id).populate("owner");
  // populate() <- (변수) 변수에 실제 데이터를 할당한다.
  // console.log(video);
  // console.log(owner);
  if (video === null) {
    return res.status(404).render("404", { pageTitle: "Video not Found." });
  }
  return res.render("watch", { pageTitle: video.title, video });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  if (video === null) {
    return res.status(404).render("404", { pageTitle: "Video not Found." });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  return res.render("edit", { pageTitle: `Edit : ${video.title} `, video });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  // console.log(req.body);
  const {
    user: { _id },
  } = req.session;
  const video = await Video.exists({ _id: id });
  if (video === null) {
    return res.status(404).render("404", { pageTitle: "Video not Found." });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  // 아래의 주석은 Video.findByIdAndUpdate와 같은 기능을 한다.
  // video.title = title;
  // video.description = description;
  // video.hashtags = hashtags.split(",").map((word) => word.startsWith("#") ? word : `#${word}`);
  // await video.save();
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { path: fileUrl } = req.file;
  const { title, description, hashtags } = req.body;
  // const {
  //   session : {
  //     user : {
  //       _id,
  //     },
  //   },
  //   file : {
  //     path : fileUrl,
  //   },
  //   body : {
  //     title,
  //     description,
  //     hashtags,
  //   },
  // } = req;
  try {
    const newVideo = await Video.create({
      title,
      description,
      createdAt: Date.now(),
      fileUrl,
      owner: _id,
      hashtags: Video.formatHashtags(hashtags),
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    return res.redirect("/");
  } catch (error) {
    return res.status(400).render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndDelete(id);
  // delete video
  return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        //regex -> regular Expression
        $regex: new RegExp(`${keyword}$`, "i"),
      },
    }).populate("owner");
    // console.log("I'm looking for", videos);
  }
  return res.render("search", { pageTitle: "Search", videos });
};
