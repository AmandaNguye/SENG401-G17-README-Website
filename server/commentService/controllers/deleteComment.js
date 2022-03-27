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

	} catch (e) {
		res.status(404).json({ error: e });
	}
}

/**
 * Delete all comments of a post
 * @param {*} req
 * @param {*} res 
 */
export const deleteCommentsByPost = async (req, res) => {
	try {
		const result = await Comment.deleteMany({
			post: req.params.p_id,
		});
		if (result.deletedCount > 0) {
			res.status(200).send();
		}
		else {
			res.status(400).send();
		}

	} catch (e) {
		console.log(e);
		res.status(404).json({ error: e });
	}
}