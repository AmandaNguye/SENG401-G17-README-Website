import Comment from "../models/comment.js";

/**
 * Modifying fame count
 * @param {*} req 1. userID: current user ID,
 *  2. voteType: the type of the vote: "" means cancel current vote, "fame" and "lame" means fame and lame
 * @param {*} res 
 */
export const voteComment = async (req, res) => {
    const request = req.body;
    const commentID = req.params.c_id;
    var voterType, amountToChange;

    if(request["voteType"] == "")
    {
        //Try to remove user from famer
        var result = await Comment.updateOne({"_id": commentID},{
            $pull: {
                "famer": request.userID
            }
        });
        //If the update is successful
        if(result.modifiedCount > 0)
        {
            //Remove one fame from the count
            await Comment.updateOne({_id: commentID},{
                $inc: {
                    "fame_count": -1
                }
            });
        }
        //If the update is not successful
        else
        {
            //Attempt to remove one from the lamer
            result = await Comment.updateOne({"_id": commentID},{
                $pull: {
                    "lamer": request.userID
                }
            });
            //If the attempt is successful
            if(result.modifiedCount > 0)
            {
                //Add one to the fame count
                await Comment.updateOne({"_id": commentID},{
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
        var result = Comment.updateOne({"_id": commentID},{
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
        var result = Post.updateOne({"_id": commentID},{
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
        var result  = await Post.updateOne({"_id": commentID},{
            $addToSet: {
                [voterType] : request.userID
            }
        });
        if(result.modifiedCount > 0)
        {
            await Post.updateOne({"_id": commentID},{
                $inc: {
                    "fame_count": amountToChange
                }
            });
        }
    }
}


/**
 * Update comment with the inputted information, only inputted field will be updated
 * @param {*} req 1. userID: ID of the current user 
 * 2. content: the updated content
 * @param {*} res 
 */
export const updateComment = async (req, res) => {
    const request = req.body;
    const userID = request.userID;

    try {
		const comment = await Comment.findById(req.params.id);
        if(userID != comment.creator)
        {
            res.status(400).json({ error: "You do not have permission for this change"});
        }
        Object.assign(comment, request.content);
        await comment.save();
        res.send({data: comment});
	} catch {
		res.status(404).json({ error: "Post doesn't exist!" });
	}

}