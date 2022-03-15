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
    tags: {
      type: [String],
    },
    fame: {
      type: Number,
      default: 0,
      min: 0,
    },
    lame: {
      type: Number,
      default: 0,
      min: 0,
    },
    creator: {
      type: mongoose.SchemaType.ObjectId,
      ref: "user",
      required: true,
      immutable: true,
    },
  },
  { timestamps: true }
);
const Post = mongoose.model("Post", postSchema);

export default Post;
