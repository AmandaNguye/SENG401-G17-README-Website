import { express } from "express";
import Post from "../models/post.js"


import { getAllPosts, getPostByID } from "../controllers/getPosts.js"

const router = express.Router();

router.get("/posts", getAllPosts);

router.get("/posts/:id", getPostByID);

/*router.post("/posts", async (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        tags: req.body.tags,
        fame: req.body.fame,
        lame: req.body.lame,
    })
    await post.save()
    res.send(post)
})*/

router.delete("/posts/:id", async (req, res) => {
	try {
		await Post.deleteOne({ _id: req.params.id })
		res.status(204).send()
	} catch {
		res.status(404)
		res.send({ error: "Post doesn't exist!" })
	}
})

module.exports = router