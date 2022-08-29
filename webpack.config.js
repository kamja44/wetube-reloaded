const path = require("path");

// console.log(path.resolve(__dirname, "assets", "js"));
// path.resolve() <- 입력하는 파트들을 모아서 경로로 만들어줌
// __dirname <- 파일까지의 절대경로
// console.log(__dirname);
module.exports={
    // entry <- 처리하고 싶은 파일 (main.js)
    entry : "./src/client/js/main.js",
    mode : "development",
    output : {
        filename : "main.js",
        // path <- 파일을 어디 저장할지
        path : path.resolve(__dirname, "assets","js"),
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets : [["@babel/preset-env", {targets : "defaults"}]],
                    },
                },
            },
        ],
    },
};