import Post from "../models/post";

export const getAllPosts = async (req,res) => {
    const posts = await Post.find();
    res.json(posts);
}

export const getPostByID = async (req,res) => {
    try {
		const post = await Post.findOne({ _id: req.params.id });
		res.json(post);
	} catch {
		res.status(404);
		res.json({ error: "Post doesn't exist!" });
	}
}