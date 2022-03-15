import Post from "../models/post";

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
			"content" : {$regex: query},
			"title" : {$regex: query}
		}).limit(pageOptions.limit)
		  .skip(pageOptions.limit * pageOptions.page);
	}
	//If there is not a query
	else
	{
		//return all posts
		const posts = await Post.find()
			.limit(pageOptions.limit)
			.skip(pageOptions.limit * pageOptions.page);
	}

    res.json(posts);
}

/*export const findPosts = async (req,res) => {
	
    res.json(posts);
}*/

export const getPostByID = async (req,res) => {
    try {
		const post = await Post.findOne({ _id: req.params.id });
		res.json(post);
	} catch {
		res.status(404).json({ error: "Post doesn't exist!" });
	}
}