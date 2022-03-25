import Post from "../models/post.js";

/**
 * Delete a post but the user have to be the creator of the post
 * @param {*} req
 * @param {*} res 
 */
export const deletePost = async (req, res) => {
	const username = req.user.username;
	try {
		const result = await Post.deleteOne({
			_id: req.params.id,
			creator: username
		});
		if (result.deletedCount == 1) {
			res.status(204).json({ message: "Successfully Deleted" });
		}
		else {
			res.status(400).send();
		}

	} catch {
		res.status(404).json({ error: "Post doesn't exist!" });
	}
}