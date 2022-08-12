import "./db";
import  "./models/Video";
import "./models/User";
// import "./경로" <- 모든 파일에서 사용할 수 있게 import한다. 즉, 모든 파일에 import 한다.
import app from "./server";

const PORT = 4000;

const handleListening = () =>
  console.log(`✅   Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);
// app.listen(포트번호, callback)
