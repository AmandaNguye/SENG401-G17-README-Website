import { express } from "express";


import { getPostByID, findPosts } from "../controllers/getPosts.js"
import { createPost } from "../controllers/createPost.js"
import { deletePost } from "../controllers/deletePost.js"

const router = express.Router();


//TODO: Combine get all posts and find posts
//If there is no query then get all
router.get("/posts", findPosts);

router.get("/posts/:id", getPostByID);

router.post("/posts", createPost);

router.delete("/posts/:id", deletePost);

export default router;