import multer from "multer";
export const localsMiddleware = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn); // 로그인 되었을 때 동작
    res.locals.siteName = "Wetube";
    res.locals.loggedInUser = req.session.user || {};
    // console.log(req.session);
    console.log(res.locals.loggedInUser);
    next();
}
export const protectorMiddleware = (req, res, next) => {
    if(req.session.loggedIn){
        next();
    }else{
        return res.redirect("/login");
    }
};
export const publicOnlyMiddleware = (req, res, next) => {
    if(!req.session.loggedIn){
        return next();
    }else{
        return res.redirect("/");
    }
}
// multer() middleware
export const avatarUpload = multer({
    dest:"uploads/avatars",
    limists:{
        fileSize:3000000,
    },
});
export const videoUpload = multer({
    dest:"uploads/videos",
    limits:{
        fileSize:10000000,
    },
}); 