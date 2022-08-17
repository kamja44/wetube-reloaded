import User from "../models/User";
import fetch from "node-fetch";
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
  // session initialize(세션 초기화)
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};

export const startGithubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id : process.env.GH_CLIENT,
    allow_signup : false,
    scope : "read:user user:email", // seperated by space
  };
  const params = new URLSearchParams(config).toString(); // config Object를 URL형식으로 반한다.
  // 이런식으로 client_id=49f81e4d2392c1420835&allow_signup=false&scope=read%3Auser+user%3Aemail
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};
export const finishGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id : process.env.GH_CLIENT,
    client_secret : process.env.GH_SECRET,
    code : req.query.code,
  }
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const tokenRequest = await (
    await fetch(finalUrl, {
    method : "POST",
    headers :{
      Accept : "application/json",
    },
  })
  ).json();
  if("access_token" in tokenRequest){
    // access api
    const {access_token} = tokenRequest; // json변수의 access_token 추출
    const userRequest = await (
      await fetch("https://api.github.com/user",{
      headers:{
        Authorization : `token ${access_token}`,
      },
    })).json();
    console.log(userRequest);
  }else{
    return res.redirect("/login");
  }
};

export const edit = (req, res) => res.send("Edit");
export const remove = (req, res) => res.send("Remove");
export const logout = (req, res) => res.send("Log Out");
export const see = (req, res) => res.send("See");
