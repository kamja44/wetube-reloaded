import Video from "../models/Video";

export const home = (req, res) => {
    // {} <- search terms 비어있으면 모든 형식을 찾는다. 즉, 모든 형태의 Video를 찾는다
    console.log("Start")
    Video.find({},(error, videos) => {
        console.log("Search")
        return res.render("home", {pageTitle : "Home", videos}); 
    });
    console.log("I finished first");
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
export const postUpload = (req, res) => {
    const {title} = req.body
    return res.redirect("/");
};