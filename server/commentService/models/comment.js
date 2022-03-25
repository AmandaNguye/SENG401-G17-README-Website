import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      minLength: 5,
    },
    fame_count: {
      type: Number,
      default: 0,
    },
    post: {
      type: String,
      required: true,
      immutable: true,
    },
    famer: {
      type: [String],
      default: []
    },
    lamer: {
      type: [String],
      default: []
    },
    creator: {
      type: String,
      required: true,
      immutable: true,
    },
  },
  { timestamps: true }
);
const Comment = mongoose.model("comment", commentSchema);

export default Comment;
