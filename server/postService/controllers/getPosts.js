import Post from "../models/post.js";

/**
 * Find posts using queries, if no query is inputted then find all posts
 * @param {*} req all parameter is in in url query format ("/posts?")1. page: the current page number
 * 2. limit: the amount of post within a page
 * 3. q: the text query
 * @param {*} res 
 */
export const findPosts = async (req,res) => {
	const {page = 0, limit = 10, q} = req.query;

	var posts;

	const pageOptions = {
		page: parseInt(page, 10),
		limit: parseInt(limit, 10)
	}

	//If there is a query
	if(q)
	{
		posts = await Post.find({
			$text: {
				$search: q
			}
		}).sort({ title: -1 })
		  .limit(pageOptions.limit)
		  .skip(pageOptions.limit * pageOptions.page);
	}
	//If there is not a query
	else
	{
		//return all posts
		posts = await Post.find()
			.sort({ title: -1 })
			.limit(pageOptions.limit)
			.skip(pageOptions.limit * pageOptions.page);
	}

    res.json(posts);
}

/**
 * Return post with the id in the url
 * @param {*} req 
 * @param {*} res 
 */
export const getPostByID = async (req,res) => {
    try {
		const post = await Post.findOne({ _id: req.params.id });
		res.json(post);
	} catch {
		res.status(404).json({ error: "Post doesn't exist!" });
	}
}