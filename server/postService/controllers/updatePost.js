import Post from "../models/post.js";

//Modifying the fame count using fame/lame, require userID to be sent in req
export const voteWithinPosts = async (req, res) => {
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

//Modifying the fame count using fame/lame, require userID, postID to be sent in req
export const votePosts = async (req, res) => {
    const request = req.body;
    const postID = request.postID;
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