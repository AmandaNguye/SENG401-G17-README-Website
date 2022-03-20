import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      minLength: 15,
    },
    fame_count: {
      type: Number,
      default: 0,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
      required: true,
      immutable: true,
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
const Comment = mongoose.model("comment", commentSchema);

export default Comment;
