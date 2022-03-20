import Comment from "../models/comment.js";

/**
 * Find comments of a post
 * @param {*} req
 * URL Queries format ("/post/:id/comment?page=0&limit=10") 
 * 1. page: the current page number
 * 2. limit: the amount of comment within a page
 * 
 * :p_id need to be id of the post
 * 
 * Body should include user ID as userID
 * @param {*} res 
 */
export const getComments = async (req,res) => {
	const {page = 0, limit = 10, q} = req.query;
	const postID = req.params.p_id;
	const currentUser = req.body.userID;
	var comments;

	const pageOptions = {
		page: parseInt(page, 10),
		limit: parseInt(limit, 10)
	}

	posts = await Comment.find({
		post: postID
	}).sort({ _id: -1 })
	.limit(pageOptions.limit)
	.skip(pageOptions.limit * pageOptions.page);
		
	var result = [];
	for(var comment in comments)
	{
		result.push({
			content: comment.content,
			fame_count: comment.fame_count,
			creator: comment.creator,
			famed: comment.famer.includes(currentUser),
			lamed: comment.lamer.includes(currentUser),
		});
	}
    res.json(result);
}

/**
 * Return post with the id in the url
 * @param {*} req Body should include user ID as userID
 * @param {*} res 
 */
export const getCommentByID = async (req,res) => {
    try {
		const currentUser = req.body.userID;
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