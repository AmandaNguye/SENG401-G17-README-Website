import Post from "../models/post.js";


//TODO: get user ID
export const createPost = async (req,res) => {
    try{
        const postInfo = req.body;
        const post = new Post({
            title: postInfo.title,
            content: postInfo.content,
            tags: postInfo.tags,
            fame_count: 0,
            famer: [],
            lamer: [],
            creator: postInfo.creator,
        });
        var result = await post.save();
        res.json({result: result});
    } catch(e){
        res.status(406).json({message: e});
    }
}