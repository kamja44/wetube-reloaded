const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

// console.log(path.resolve(__dirname, "assets", "js"));
// path.resolve() <- 입력하는 파트들을 모아서 경로로 만들어줌
// __dirname <- 파일까지의 절대경로
// console.log(__dirname);
module.exports={
    // entry <- 처리하고 싶은 파일 (main.js)
    entry : {
        main: "./src/client/js/main.js",
        videoPlayer: "./src/client/js/videoPlayer.js",
    },
    plugins: [new MiniCssExtractPlugin({
        filename : "css/styles.css",
    })],
    mode : "development",
    watch : true,
    output : {
        filename : "js/[name].js",
        // path <- 파일을 어디 저장할지
        path : path.resolve(__dirname, "assets"),
        clean : true,
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
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
                // 역순으로 사용 
                // 즉, webpack은 제일 먼저 우리 코드를 가져다가 일반적인 css로 변경하고(sass-loader)
                // 변경한 코드를 css-loader한테 전달하고(css-loader)
                // styles가 css를 브라우저에 보이게 한다.(styles-loader)
            }
        ],
    },
};