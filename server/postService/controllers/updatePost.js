import Post from "../models/post.js";

/**
 * Modifying fame count
 * @param {*} req 1. username: current user username,
 *  2. voteType: the type of the vote: "" means cancel current vote, "fame" and "lame" means fame and lame
 * @param {*} res 
 */
export const votePosts = async (req, res) => {
    const request = req.body;
    const postID = req.params.id;
    var voterType, amountToChange;
    var post = await Post.findById(postID);
    if(request.voteType == "")
    {
        
        if(post.famer.includes(request.username))
        {
            var result = await Post.updateOne({"_id": postID},{
                $pull: {
                    famer: request.username
                }
            });
            //If the update is successful
            if(result.modifiedCount > 0)
            {
                //Remove one fame from the count
                await Post.updateOne({_id: postID},{
                    $inc: {
                        fame_count: -1
                    }
                });
                res.status(200).send();
            }
        }
        else if(post.lamer.includes(request.username))
        {
            result = await Post.updateOne({"_id": postID},{
                $pull: {
                    lamer: request.username
                }
            });
            //If the attempt is successful
            if(result.modifiedCount > 0)
            {
                //Add one to the fame count
                await Post.updateOne({"_id": postID},{
                    $inc: {
                        fame_count: 1
                    }
                });
                res.status(200).send();
            }
        }
        else
        {
            res.status(200).send();
        }
    }
    else if(request.voteType == "fame")
    {
        voterType = "famer";

        if(post.famer.includes(request.username))
        {
            res.status(200).send();
            return;
        }
        if(post.lamer.includes(request.username))
        {
            await Post.updateOne({"_id": postID},{
                $pull: {
                    lamer: request.username
                }
            });
            amountToChange = 2;
        }
        else
        {
            amountToChange = 1;
        }
    }
    else if(request.voteType == "lame")
    {
        voterType = "lamer";

        if(post.lamer.includes(request.username))
        {
            res.status(200).send();
            return;
        }
        if(post.famer.includes(request.username))
        {
            var result = await Post.updateOne({"_id": postID},{
                $pull: {
                    famer: request.username
                }
            });
            amountToChange = -2;
        }
        else
        {
            amountToChange = -1;
        }
    }

    if(voterType)
    {
        var result;
        if(voterType)
        {
            result  = await Post.updateOne({"_id": postID},{
                $addToSet: {
                    [voterType] : request.username
                }
            });
        }
        if(result.modifiedCount > 0)
        {
            result = await Post.updateOne({"_id": postID},{
                $inc: {
                    fame_count: amountToChange
                }
            });
            res.status(200).send();
        }
    }
    res.status(400).send();
}


/**
 * Update post with the inputted information, only inputted field will be updated
 * @param {*} req 1. username: username of the current user 
 * 2. update: the update needed for the post (Only title, content and tag can be updated)
 * @param {*} res 
 */
export const updatePost = async (req, res) => {
    const request = req.body;
    const username = request.username;

    try {
		const post = await Post.findById(req.params.id);
        if(username != post.creator)
        {
            res.status(400).json({ error: "You do not have permission for this change"});
            return;
        }
        delete request.update["fame_count"];
        Object.assign(post, request.update);
        await post.save();
        res.status(200).send({data: post});
	} catch {
		res.status(404).json({ error: "Post doesn't exist!" });
	}
}