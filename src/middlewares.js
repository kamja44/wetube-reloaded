export const localsMiddleware = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn); // 로그인 되었을 때 동작
    res.locals.siteName = "Wetube";
    res.locals.loggedInUser = req.session.user;
    next();
}