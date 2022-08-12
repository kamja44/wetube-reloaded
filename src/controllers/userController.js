import User from "../models/User";
export const getJoin = (req, res) => res.render("join",{pageTitle : "join" });
export const postJoin = async(req, res) => {
    const {name, username, email, password, location } = req.body;
    await User.create({
        name, username, email, password, location,
    });
    /*
    bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash){})
    myplaintextPassword <- 사용자의 비밀번호(해시함수를 적용시킬 비밀번호)
    saltRounds <- 해시함수를 얼마나 적용시킬것인가 즉, 몇 번 해싱할것인지 설정
    function(err, hash){} <- 출력값(결과값)
    */
    return res.redirect("/login");
};
export const edit = (req, res) => res.send("Edit");
export const remove = (req, res) => res.send("Remove");
export const login = (req, res) => res.send("Login");
export const logout = (req, res) => res.send("Log Out");
export const see = (req, res) => res.send("See");