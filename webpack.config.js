module.exports={
    // entry <- 처리하고 싶은 파일 (main.js)
    entry : "./src/client/js/main.js",
    output : {
        filename : "main.js",
        // path <- 파일을 어디 저장할지
        path : "./assets/js"
    }
};