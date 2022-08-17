import mongoose from "mongoose";
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify : false,
  // useCreateIndex : true,
});

const db = mongoose.connection;

const handleOpen = () => console.log("✅   Connected to DB");
const handleError = (error) => console.log("❌   DB ERROR", error);
// on -> 여러번, once -> 딱 한번
db.on("error", handleError);
db.once("open", handleOpen);
