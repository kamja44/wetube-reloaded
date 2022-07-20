import Video from "../models/Video";

// Video.find({},(error, videos) => {}); <- callback function

export const home = async(req, res) => {
    // {} <- search terms 비어있으면 모든 형식을 찾는다. 즉, 모든 형태의 Video를 찾는다
    const videos = await Video.find({});
    console.log(videos);
    return res.render("home", {pageTitle : "Home", videos}); 
}
export const watch = (req, res) => {
    // const id = req.params.id; 코드와 const {id} = req.params; 코드는 동일하다.
    const {id} = req.params;
    return res.render("watch", {pageTitle : `Watching : `, })
}
export const getEdit = (req, res) =>{
    const {id} = req.params;
    return res.render("edit",{pageTitle : `Editing : `,});
}
export const postEdit = (req, res) => {
    const {id} = req.params;
    // console.log(req.body);
    const {title} = req.body;
    return res.redirect(`/videos/${id}`);
};
export const getUpload = (req, res) => {
    return res.render("upload", {pageTitle : "Upload Video"});
};
export const postUpload = async (req, res) => {
    const {title, description, hashtags} = req.body;
    console.log(title, description ,hashtags);
    // const video = new Video({
    //     title, // title == title : title
    //     description, // description == description : description
    //     hashtags : hashtags.split(",").map((word) => `#${word}`),
    //     createdAt : Date.now(),
    //     meta : {
    //         views : 0,
    //         rating : 0,
    //     }
    // });
    // const dbVideo = await video.save();
    await Video.create({ // 위의 주석 코드와 동일한 기능
        title,
        description,
        createdAt : Date.now(),
        hashtags : hashtags.split(",").map((word) => `#${word}`),
        meta : {
            views : 0,
            rating : 0,
        },
    });
    
    return res.redirect("/");
};