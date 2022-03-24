import Comment from "../models/comment.js";

/**
 * Delete a comment but the user have to be the creator of the post
 * @param {*} req
 * @param {*} res 
 */
export const deleteComment = async (req, res) => {
	const username = req.user.username;
	try {
		const result = await Comment.deleteOne({
			_id: req.params.c_id,
			post: req.params.p_id,
			creator: username,
		});
		if (result.deletedCount == 1) {
			res.status(204).send();
		}
		else {
			res.status(400).send();
		}

	} catch {
		res.status(404).json({ error: "Post doesn't exist!" });
	}
}