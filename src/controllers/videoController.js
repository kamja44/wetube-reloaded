import Video from "../models/Video";

// Video.find({},(error, videos) => {}); <- callback function

export const home = async (req, res) => {
  // {} <- search terms 비어있으면 모든 형식을 찾는다. 즉, 모든 형태의 Video를 찾는다
  const videos = await Video.find({});
  return res.render("home", { pageTitle: "Home", videos });
};

export const watch = async (req, res) => {
  // const id = req.params.id; 코드와 const {id} = req.params; 코드는 동일하다.
  const { id } = req.params;
  const video = await Video.findById(id);
  if (video === null) {
    return res.render("404", { pageTitle: "Video not Found." });
  }
  return res.render("watch", { pageTitle: video.title, video });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (video === null) {
    return res.render("404", { pageTitle: "Video not Found." });
  }
  return res.render("edit", { pageTitle: `Edit : ${video.title} `, video });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  console.log(req.body);
  const video = await Video.exists({ _id: id });
  if (video === null) {
    return res.render("404", { pageTitle: "Video not Found." });
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: hashtags
      .split(",")
      .map((word) => (word.startsWith("#") ? word : `#${word}`)),
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
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      createdAt: Date.now(),
      hashtags,
    });
    return res.redirect("/");
  } catch (error) {
    return res.render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};
