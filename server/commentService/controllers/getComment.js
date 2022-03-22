import Comment from "../models/comment.js";

/**
 * Find comments of a post
 * @param {*} req
 * URL Queries format ("/post/:p_id/comment?page=0&limit=10&username=abc") 
 * 1. page: the current page number
 * 2. limit: the amount of comment within a page
 * 3. username: the current user username
 * 
 * :p_id need to be id of the post
 * 
 * @param {*} res 
 */
export const getComments = async (req, res) => {
	const { page = 0, limit = 10 } = req.query;
	const postID = req.params.p_id;
	const currentUser = req.query.username;
	var comments;

	const pageOptions = {
		page: parseInt(page, 10),
		limit: parseInt(limit, 10)
	}

	comments = await Comment.find({
		post: postID
	}).sort({ _id: -1 })
		.limit(pageOptions.limit)
		.skip(pageOptions.limit * pageOptions.page);

	var result = [];
	for (let i = 0; i < comments.length; i++) {
		result.push({
			content: comments[i].content,
			fame_count: comments[i].fame_count,
			creator: comments[i].creator,
			famed: comments[i].famer.includes(currentUser),
			lamed: comments[i].lamer.includes(currentUser),
			_id: comments[i]._id,
		});
	}
	res.json(result);
}

/**
 * Return post with the id in the url
 * @param {*} req query should include: username of the current user as username
 * @param {*} res 
 */
export const getCommentByID = async (req, res) => {
	try {
		const currentUser = req.query.username;
		const comment = await Comment.findById(req.params.c_id);
		res.json({
			content: comment.content,
			fame_count: comment.fame_count,
			creator: comment.creator,
			famed: comment.famer.includes(currentUser),
			lamed: comment.lamer.includes(currentUser),
		});
	} catch {
		res.status(404).json({ error: "Comment doesn't exist!" });
	}
}