import express from "express";


import { getPostByID, getPosts } from "../controllers/getPosts.js"
import { createPost } from "../controllers/createPost.js"
import { deletePost } from "../controllers/deletePost.js"
import { votePosts, updatePost } from "../controllers/updatePost.js"

const router = express.Router();

router.get("/", getPosts);

router.get("/:id", getPostByID);

router.post("/", createPost);

router.delete("/:id", deletePost);

router.put("/:id/vote", votePosts);

router.patch("/:id", updatePost);

export default router;