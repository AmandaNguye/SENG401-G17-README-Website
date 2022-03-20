import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 15,
    },
    content: {
      type: String,
      required: true,
      minLength: 15,
    },
    tag: {
      type: String,
    },
    fame_count: {
      type: Number,
      default: 0,
    },
    famer: {
      type : [mongoose.Schema.Types.ObjectId],
      ref: "user"
    },
    lamer: {
      type : [mongoose.Schema.Types.ObjectId],
      ref: "user"
    }
    ,
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      immutable: true,
    },
  },
  { timestamps: true }
);
const Post = mongoose.model("Post", postSchema);

export default Post;
