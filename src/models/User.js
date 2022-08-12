import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email : {type : String, required : true, unique : true,},
    username : {type:String, required : true, unique : true,},
    password : {type : String, required : true,},
    name : {type : String, required : true,},
    location : String,
});
/*
    bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash){})
    myplaintextPassword <- 사용자의 비밀번호(해시함수를 적용시킬 비밀번호)
    saltRounds <- 해시함수를 얼마나 적용시킬것인가 즉, 몇 번 해싱할것인지 설정
    function(err, hash){} <- 출력값(결과값)
    */
   // 
userSchema.pre("save", async function(){
    // this <- create되는 User
    console.log("User password : ", this.password);
    this.password = await bcrypt.hash(this.password,7);
    console.log("Hashed password", this.password);
});

const User = mongoose.model("user", userSchema);
export default User;