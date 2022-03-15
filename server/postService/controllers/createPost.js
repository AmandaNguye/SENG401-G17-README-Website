import Post from "../models/post.js";


//TODO: get user ID
export const createPost = async (req,res) => {
    try{
        const postInfo = req.body;
        const post = new Post({
            title: postInfo.title,
            content: postInfo.content,
            tags: postInfo.tags,
            fame: 0,
            lame: 0,
            creator: postInfo.creator,
        })
    } catch(e){
        res.status(406).json({message: e});
    }
}