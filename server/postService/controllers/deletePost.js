import Post from "../models/post.js";

export const deletePost = async (req, res) => {
    try {
		await Post.deleteOne({ _id: req.params.id });
		res.status(204).send()
	} catch {
		res.status(404).json({ error: "Post doesn't exist!"});
	}
}