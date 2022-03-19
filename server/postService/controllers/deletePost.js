import Post from "../models/post.js";

export const deletePost = async (req, res) => {
	const userID = req.body.userID;
    try {
		const result = await Post.deleteOne({ 
			_id: req.params.id,
			creator: userID
		});
		if(result.deletedCount == 1)
		{
			res.status(204).send();
		}
		else
		{
			res.status(400).send();
		}

	} catch {
		res.status(404).json({ error: "Post doesn't exist!"});
	}
}