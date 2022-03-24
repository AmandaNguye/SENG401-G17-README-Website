import Post from "../models/post.js";

/**
 * Modifying fame count
 * @param {*} req voteType: the type of the vote: "" means cancel current vote, "fame" and "lame" means fame and lame
 * @param {*} res
 */
export const votePosts = async (req, res) => {
    const request = req.body;
    const username = req.user.username;
    const postID = req.params.id;
    var voterType, amountToChange;
    var post = await Post.findById(postID);
    const famed = post.famer.includes(username);
    const lamed = post.lamer.includes(username);
    if (request.voteType == "") {

        if (famed) {
            var result = await Post.updateOne({ "_id": postID }, {
                $pull: {
                    famer: username
                }
            });
            //If the update is successful
            if (result.modifiedCount > 0) {
                //Remove one fame from the count
                await Post.updateOne({ _id: postID }, {
                    $inc: {
                        fame_count: -1
                    }
                });
                return res.status(200).send();
            }
        }
        else if (lamed) {
            result = await Post.updateOne({ "_id": postID }, {
                $pull: {
                    lamer: username
                }
            });
            //If the attempt is successful
            if (result.modifiedCount > 0) {
                //Add one to the fame count
                await Post.updateOne({ "_id": postID }, {
                    $inc: {
                        fame_count: 1
                    }
                });
                return res.status(200).send();
            }
        }
        else {
            return res.status(200).send();
        }
    }
    else if (request.voteType == "fame") {
        voterType = "famer";

        if (famed) {
            res.status(200).send();
            return;
        }
        if (lamed) {
            await Post.updateOne({ "_id": postID }, {
                $pull: {
                    lamer: username
                }
            });
            amountToChange = 2;
        }
        else {
            amountToChange = 1;
        }
    }
    else if (request.voteType == "lame") {
        voterType = "lamer";

        if (lamed) {
            res.status(200).send();
            return;
        }
        if (famed) {
            var result = await Post.updateOne({ "_id": postID }, {
                $pull: {
                    famer: username
                }
            });
            amountToChange = -2;
        }
        else {
            amountToChange = -1;
        }
    }
    if (voterType) {
        var result = await Post.updateOne(
            { _id: postID },
            {
                $addToSet: {
                    [voterType]: username,
                },
            }
        );
    }
    if (result.modifiedCount > 0) {
        result = await Post.updateOne(
            { _id: postID },
            {
                $inc: {
                    fame_count: amountToChange,
                },
            }
        );
        return res.status(200).send();
    }
    //If nothing is send to user by this line, then there is an error
    return res.status(404).send();
}

/**
 * Update post with the inputted information, only inputted field will be updated
 * @param {*} req update: the update needed for the post (Only title, content and tag can be updated)
 * @param {*} res
 */
export const updatePost = async (req, res) => {
    const request = req.body;
    const username = req.user.username;
    try {
        const post = await Post.findById(req.params.id);
        if (username != post.creator) {
            res
                .status(400)
                .json({ error: "You do not have permission for this change" });
            return;
        }
        delete request.update["fame_count"];
        Object.assign(post, request.update);
        await post.save();
        res.status(200).send({ data: post });
    } catch {
        res.status(404).json({ error: "Post doesn't exist!" });
    }
};
