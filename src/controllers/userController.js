import User from "../models/User";
import bcrypt from "bcrypt";
export const getJoin = (req, res) => res.render("join", { pageTitle: "join" });
export const postJoin = async (req, res) => {
  const { name, username, email, password, password2, location } = req.body;
  const exists = await User.exists({ $or: [{ username }, { email }] });
  const pageTitle = "Join";
  if (password !== password2) {
    return res.render("join", {
      pageTitle,
      errorMessage: "Password confirmation does not match",
    });
  }
  if (exists) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "This username/email is already taken.",
    });
  }
  //   const emailExists = await User.exists({ email });
  //   if (emailExists) {
  //     return res.render("join", {
  //       pageTitle,
  //       errorMessage: "This email is already taken.",
  //     });
  //   };
  try{
    await User.create({
      name,
      username,
      email,
      password,
      location,
    });
    return res.redirect("/login");
  }catch(error){
    return res.sattus(400).render("join",{
      pageTitle : "Join",
      errorMessage : error._message,
    })
  }
  /*
    bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash){})
    myplaintextPassword <- 사용자의 비밀번호(해시함수를 적용시킬 비밀번호)
    saltRounds <- 해시함수를 얼마나 적용시킬것인가 즉, 몇 번 해싱할것인지 설정
    function(err, hash){} <- 출력값(결과값)
    */
};
export const getLogin = (req, res) => 
  res.render("login", {pageTitle : "Login"});

export const postLogin = async(req, res) => {
  const {username, password} = req.body;
  const pageTitle = "Login";
  const user = await User.findOne({username});
  if(!user){
    return res.status(400).render("login", {
      pageTitle,
      errorMessage : "An account with this username does not exists.",
    });
  }
  const ok = await bcrypt.compare(password, user.password);
  if(!ok){
    return res.status(400).render("login",{
      pageTitle,
      errorMessage : "Wrong password",
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
}

export const edit = (req, res) => res.send("Edit");
export const remove = (req, res) => res.send("Remove");
export const logout = (req, res) => res.send("Log Out");
export const see = (req, res) => res.send("See");
