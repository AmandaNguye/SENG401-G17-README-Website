import Post from "../models/post.js";

//Find post by key word or all posts
export const findPosts = async (req,res) => {
	const {page = 0, limit = 10, q} = req.query;

	const pageOptions = {
		page: parseInt(page, 10),
		limit: parseInt(limit, 10)
	}

	//If there is a query
	if(q)
	{
		const posts = await Post.find({
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
		const posts = await Post.find()
			.sort({ title: -1 })
			.limit(pageOptions.limit)
			.skip(pageOptions.limit * pageOptions.page);
	}

    res.json(posts);
}

export const getPostByID = async (req,res) => {
    try {
		const post = await Post.findOne({ _id: req.params.id });
		res.json(post);
	} catch {
		res.status(404).json({ error: "Post doesn't exist!" });
	}
}