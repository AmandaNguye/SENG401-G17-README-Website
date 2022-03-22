import Post from "../models/post.js";

/**
 * Find posts using queries, if no query is inputted then find all posts
 * @param {*} req all parameter is in in url query format ("/posts?")
 * 1. page: the current page number
 * 2. limit: the amount of post within a page
 * 3. q: the text query
 *
 * username: current user
 * @param {*} res
 */

export const getPosts = async (req, res) => {
  const { page = 0, limit = 10, q } = req.query;
  const currentUser = req.query.username;
  var posts;

  const pageOptions = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
  };

  //If there is a query
  if (q) {
    posts = await Post.find({
      $text: {
        $search: q,
      },
    })
      .sort({ title: -1 })
      .limit(pageOptions.limit)
      .skip(pageOptions.limit * pageOptions.page);
  }
  //If there is not a query
  else {
    //return all posts
    posts = await Post.find()
      .sort({ title: -1 })
      .limit(pageOptions.limit)
      .skip(pageOptions.limit * pageOptions.page)
      .exec();
  }
  var result = [];
  for (var i = 0; i < posts.length; i++) {
    result.push({
      title: posts[i].title,
      content: posts[i].content,
      tag: posts[i].tag,
      fame_count: posts[i].fame_count,
      creator: posts[i].creator,
      famed: posts[i].famer.length > 0 && posts[i].famer.includes(currentUser),
      lamed: posts[i].lamer.length > 0 && posts[i].lamer.includes(currentUser),
      _id: posts[i]._id,
    });
  }

  res.json(result);
};

/**
 * Return post with the id in the url
 * @param {*} req username: current user
 * @param {*} res
 */
export const getPostByID = async (req, res) => {
  try {
    const currentUser = req.query.username;
    const post = await Post.findById(req.params.id);
    res.json({
      title: post.title,
      content: post.content,
      tag: post.tag,
      fame_count: post.fame_count,
      creator: post.creator,
      famed: post.famer.length > 0 && post.famer.includes(currentUser),
      lamed: post.lamer.length > 0 && post.lamer.includes(currentUser),
      famer: post.famer,
      lamer: post.lamer,
      _id: post._id,
    });
  } catch {
    res.status(404).json({ error: "Post doesn't exist!" });
  }
};
