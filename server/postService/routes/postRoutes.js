import express from "express";


import { getPostByID, findPosts } from "../controllers/getPosts.js"
import { createPost } from "../controllers/createPost.js"
import { deletePost } from "../controllers/deletePost.js"
import { voteWithinPosts, votePosts } from "../controllers/updatePost.js"

const router = express.Router();

router.get("/", findPosts);

router.get("/:id", getPostByID);

router.post("/", createPost);

router.delete("/:id", deletePost);

router.put("/vote", votePosts);

router.put("/:id/vote", voteWithinPosts);

export default router;