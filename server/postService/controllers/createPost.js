import Post from "../models/post.js";
import mongoose from "mongoose";

/**
 * Create post using the information embedded in the http request
 * @param {*} req 1. title: post title 
 * 2. content: post content
 * 3. tag: tag of the post
 * @param {*} res 
 */
export const createPost = async (req, res) => {
    try {
        const postInfo = req.body;
        const post = new Post({
            title: postInfo.title,
            content: postInfo.content,
            tag: postInfo.tag,
            fame_count: 0,
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