import mongoose from "mongoose";


const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 5,
    },
    content: {
      type: String,
      required: true,
      minLength: 5,
    },
    tag: {
      type: String,
    },
    fame_count: {
      type: Number,
      default: 0,
    },
    famer: {
      type : [String],
      default: [],
    },
    lamer: {
      type : [String],
      default: [],
    }
    ,
    creator: {
      type: String,
      required: true,
      immutable: true,
    },
  },
  { timestamps: true }
);

postSchema.index({title: 'text', content: 'text', tag: 'text' });

const Post = mongoose.model("Post", postSchema);

export default Post;
