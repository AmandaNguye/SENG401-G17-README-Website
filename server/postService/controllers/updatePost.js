import Post from "../models/post.js";

/**
 * Modifying fame count
 * @param {*} req 1. userID: current user ID,
 *  2. voteType: the type of the vote: "" means cancel current vote, "fame" and "lame" means fame and lame
 * @param {*} res 
 */
export const votePosts = async (req, res) => {
    const request = req.body;
    const postID = req.params.id;
    var voterType, amountToChange;

    if(request["voteType"] == "")
    {
        //Try to remove user from famer
        var result = await Post.updateOne({"_id": postID},{
            $pull: {
                "famer": request.userID
            }
        });
        //If the update is successful
        if(result.modifiedCount > 0)
        {
            //Remove one fame from the count
            await Post.updateOne({_id: postID},{
                $inc: {
                    "fame_count": -1
                }
            });
        }
        //If the update is not successful
        else
        {
            //Attempt to remove one from the lamer
            result = await Post.updateOne({"_id": postID},{
                $pull: {
                    "lamer": request.userID
                }
            });
            //If the attempt is successful
            if(result.modifiedCount > 0)
            {
                //Add one to the fame count
                await Post.updateOne({"_id": postID},{
                    $inc: {
                        "fame_count": 1
                    }
                });
            }
        }
    }


    if(request["voteType"] == "fame")
    {
        voterType = "famer";
        var result = Post.updateOne({"_id": postID},{
            $pull: {
                "lamer": request.userID
            }
        });

        if(result.modifiedCount > 0)
        {
            amountToChange = 2;
        }
        else
        {
            amountToChange = 1;
        }
    }
    else if(request["voteType"] == "lame")
    {
        voterType = "lamer";
        var result = Post.updateOne({"_id": postID},{
            $pull: {
                "famer": request.userID
            }
        });

        if(result.modifiedCount > 0)
        {
            amountToChange = -2;
        }
        else
        {
            amountToChange = -1;
        }
    }

    if(request["voteType"] != "")
    {
        var result  = await Post.updateOne({"_id": postID},{
            $addToSet: {
                [voterType] : request.userID
            }
        });
        if(result.modifiedCount > 0)
        {
            await Post.updateOne({"_id": postID},{
                $inc: {
                    "fame_count": amountToChange
                }
            });
        }
    }
}


/**
 * Update post with the inputted information, only inputted field will be updated
 * @param {*} req 1. userID: ID of the current user 
 * 2. update: the update needed for the post (Only title, content and tag can be updated)
 * @param {*} res 
 */
export const updatePost = async (req, res) => {
    const request = req.body;
    const userID = request.userID;

    try {
		const post = await Post.findById(req.params.id);
        if(userID != post.creator)
        {
            res.status(400).json({ error: "You do not have permission for this change"});
        }
        Object.assign(post, request.update);
        book.save();
        res.send({data: post});
	} catch {
		res.status(404).json({ error: "Post doesn't exist!" });
	}

}