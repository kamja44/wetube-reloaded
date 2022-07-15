let videos = [
    {
        title : "First Video",
        rating : 5,
        comments : 2,
        createdAt : "2 min ago",
        views : 1,
        id : 1,
    },
    {
        title : "Second Video",
        rating : 5,
        comments : 2,
        createdAt : "2 min ago",
        views : 59,
        id : 2,
    },
    {
        title : "Third Video",
        rating : 5,
        comments : 2,
        createdAt : "2 min ago",
        views : 59,
        id : 3,
    },
];
export const trending = (req, res) => {
    return res.render("home", {pageTitle : "Home", videos});
}
export const watch = (req, res) => {
    // const id = req.params.id; 코드와 const {id} = req.params; 코드는 동일하다.
    const {id} = req.params;
    const video = videos[id-1];
    return res.render("watch", {pageTitle : `Watching : ${video.title}`, video})
}
export const getEdit = (req, res) =>{
    const {id} = req.params;
    const video = videos[id-1];
    return res.render("edit",{pageTitle : `Editing : ${video.title}`,video});
}
export const postEdit = (req, res) => {};