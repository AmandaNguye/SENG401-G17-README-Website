import Comment from "../models/comment.js";


/**
 * Create comment using the information embedded in the http request
 * @param {*} req
 * 1. content: comment content 
 * 
 * @param {*} res 
 */
export const createComment = async (req, res) => {
    try {
        const commentInfo = req.body;
        const post = new Comment({
            content: commentInfo.content,
            fame_count: 0,
            post: req.params.p_id,
            famer: [],
            lamer: [],
            creator: req.user.username,
        });
        var result = await post.save();
        res.json({ result: result });
    } catch (e) {
        res.status(406).json({ message: e });
    }
}