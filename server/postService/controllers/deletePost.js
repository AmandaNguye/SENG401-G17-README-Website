import Post from "../models/post.js";

/**
 * Delete a post but the user have to be the creator of the post
 * @param {*} req 1. username: username of current user
 * @param {*} res 
 */
export const deletePost = async (req, res) => {
	const username = req.body.username;
    try {
		const result = await Post.deleteOne({ 
			_id: req.params.id,
			creator: username
		});
		if(result.deletedCount == 1)
		{
			res.status(204).send({message: "Successfully Deleted"});
		}
		else
		{
			res.status(400).send();
		}

	} catch {
		res.status(404).json({ error: "Post doesn't exist!"});
	}
}