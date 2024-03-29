import User from "../models/User";
import Video from "../models/Video";
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
  try {
    await User.create({
      name,
      username,
      email,
      password,
      location,
    });
    return res.redirect("/login");
  } catch (error) {
    return res.sattus(400).render("join", {
      pageTitle: "Join",
      errorMessage: error._message,
    });
  }
  /*
    bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash){})
    myplaintextPassword <- 사용자의 비밀번호(해시함수를 적용시킬 비밀번호)
    saltRounds <- 해시함수를 얼마나 적용시킬것인가 즉, 몇 번 해싱할것인지 설정
    function(err, hash){} <- 출력값(결과값)
    */
};
export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  const pageTitle = "Login";
  const user = await User.findOne({ username, socialOnly: false });
  if (!user) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "An account with this username does not exists.",
    });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "Wrong password",
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
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: "read:user user:email", // seperated by space
  };
  const params = new URLSearchParams(config).toString(); // config Object를 URL형식으로 반한다.
  // 이런식으로 client_id=49f81e4d2392c1420835&allow_signup=false&scope=read%3Auser+user%3Aemail
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};
export const finishGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;

  // aysnc await이 아닌 promise then을 사용해서 userData 가져오는 방법
  // fetch(finalUrl, {
  //   method : "POST",
  //   headers:{
  //     Accept : "application/json",
  //   },
  // })
  //   .then((response) => response.json())
  //   .then((json) => {
  //     if("access_token" in json){
  //       const {access_token} = tokenRequest;
  //       const apiUrl = "https://api.github.com";
  //       fetch(`${apiUrl}/user`, {
  //         headers:{
  //           Authorization:`token ${access_token}`,
  //         },
  //       })
  //         .then((response) => response.json())
  //         .then((json) => {
  //           fetch(`${apiUrl}/user/emails`,{
  //             headers:{
  //               Authorization : `token ${access_token}`,
  //             },
  //           });
  //         });
  //     }
  //   });

  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();
  if ("access_token" in tokenRequest) {
    // access api
    const { access_token } = tokenRequest; // json변수의 access_token 추출
    const apiUrl = "https://api.github.com";
    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    // console.log(userData);
    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    // console.log(emailData);
    const emailObj = emailData.find(
      (email) => email.primary === true && email.verified === true
    );
    if (!emailObj) {
      // set notification
      return res.redirect("/login");
    }
    let user = await User.findOne({ email: emailObj.email });
    // user가 없을 경우 계정 생성
    if (!user) {
      user = await User.create({
        avatarUrl: userData.avatar_url,
        name: userData.name,
        username: userData.login,
        email: emailObj.email,
        password: "",
        socialOnly: true,
        location: userData.location,
      });
    }
    // 로그인 진행
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
  } else {
    return res.redirect("/login");
  }
};
export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};
export const getEdit = (req, res) => {
  return res.render("edit-profile", {pageTitle: "Edit Profile"});
};
export const postEdit = async (req, res) => {
  const{
    session : {
      user:{_id, avatarUrl},
    },
    body:{
      name,
      email,
      username,
      location,
    },
    file
  }=req;
  // console.log(file);
  // const user_id = req.session.user.id  === const{session:{user:{id}}} = req
  // console.log("session", req.session);
  // console.log("body",req.body);
  // username, email 중복 제거
  const usernameExists = await User.exists({username});
  const emailExists = await User.exists({email});
  if(req.session.user.username !== username){
    if(usernameExists){
      return res.status(400).render("edit-profile",{
        pageTitle : "Edit-Profile",
        errorMessage : "This username is already Taken",
      });
    }
  }else if(req.session.user.email !== email){
    if(emailExists){
      return res.status(400).render("edit-profile",{
        pageTitle : "Edit-Profile",
        errorMessage : "This email is already Taken",
      });
    }
  }
  const updateUser = await User.findByIdAndUpdate(
    _id,
    {
    avatarUrl : file ? file.path : avatarUrl,
    name,
    email,
    username,
    location,
  }, {new : true}); // {new : true}를 추가함으로써 가장 최근의 User정보를 가져온다.
  req.session.user = updateUser; // session Update
  return res.redirect("/users/edit");
};
export const getChangePassword = (req, res) => {
  if(req.session.user.socialOnly === true){
    return res.redirect("/");
  }
  return res.render("users/change-password", {pageTitle:"Change Password"});
}
export const postChangePassword = async(req, res) => {
  const {
    // session에서 현재 로그인한 사용자의 정보 가져오기
    session:{
      user:{_id},
    },
    // body에서 form에서 가져온 정보 가져오기
    body : { currentPassword, newPassword, NewPasswordConfirmation },
  } = req;
  // user 찾기
  const user = await User.findById(_id);
  const ok = await bcrypt.compare(currentPassword, user.password);
  if(!ok){
    return res.status(400).render("users/change-password", {
      pageTitle : "Change Password",
      errorMessage : "The Current password is incorrect",
    });
  }
  if(newPassword !== NewPasswordConfirmation){
    return res.status(400).render("users/change-password", {
      pageTitle : "Change Password",
      errorMessage:"The passwword does not match the confirmation",
    });
  }
  // 변경한 비밀번호 저장
  user.password = newPassword;
  // 비밀번호 hash
  await user.save();
  return res.redirect("/users/logout");
}

export const see = async(req, res) => {
  const {id} = req.params;
  // const user = await User.findById(id).populate("videos");
  // Double populate
  const user = await User.findById(id).populate({
    path: "videos",
    populate: {
      path: "owner",
      model: "User",
    },
  })
  // console.log(user);
  if(!user){
    return res.status(404).render("404", {pageTitle : "Not Found"});
  }
  return res.render("users/profile", {
    pageTitle:`${user.username}'s Profile`,
    user,
    });
}