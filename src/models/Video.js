import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLength: 80 },
  fileUrl : { type:String, required : true},
  description: { type: String, required: true, trim: true, minLength: 20 },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
  },
  owner : {type:mongoose.Schema.Types.ObjectId, required : true, ref:"User"},
  // ObjectId는 mongoose에서 제공하는 타입이기에 mongoose.Schema.Types.OjbectId로 사용한다.
  // ref <- User 모델을 참조한다.
});

videoSchema.static("formatHashtags", function(hashtags){
  return hashtags.split(",").map((word) => (word.startsWith("#") ? word : `#${word}`));
})


// middleware는 model이 생성되기 전에 만들어야한다.
const Video = mongoose.model("Video", videoSchema);

export default Video;
