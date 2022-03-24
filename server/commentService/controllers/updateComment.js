import Comment from "../models/comment.js";

/**
 * Modifying fame count
 * @param {*} req 1. username: current username,
 *  2. voteType: the type of the vote: "" means cancel current vote, "fame" and "lame" means fame and lame
 * @param {*} res 
 */
export const voteComment = async (req, res) => {
    const request = req.body;
    const username = req.user.username;
    const commentID = req.params.c_id;
    var voterType, amountToChange;
    var comment = await Comment.findById(commentID);
    const famed = comment.famer.includes(username);
    const lamed = comment.lamer.includes(username);

    if (request.voteType == "") {
        if (famed) {
            let result = await Comment.updateOne(
                { _id: commentID },
                {
                    $pull: {
                        famer: username
                    }
                }
            );
            //If the update is successful
            if (result.modifiedCount > 0) {
                //Remove one fame from the count
                await Comment.updateOne(
                    { _id: commentID },
                    {
                        $inc: {
                            fame_count: -1
                        }
                    }
                );
            }
            return res.status(200).send();
        } else if (lamed) {
            //Attempt to remove one from the lamer
            let result = await Comment.updateOne(
                { _id: commentID },
                {
                    $pull: {
                        lamer: username,
                    },
                }
            );
            //If the attempt is successful
            if (result.modifiedCount > 0) {
                //Add one to the fame count
                await Comment.updateOne(
                    { _id: commentID },
                    {
                        $inc: {
                            fame_count: 1
                        },
                    }
                );
                return res.status(200).send();
            }
        }
        //If the update is not successful
        else {
            return res.status(200).send();
        }
    }
    else if (request.voteType == "fame") {
        voterType = "famer";
        if (famed) {
            return res.status(200).send();
        }
        if (lamed) {
            await Comment.updateOne({ _id: commentID }, {
                $pull: {
                    lamer: username
                }
            });
            amountToChange = 2;
        } else {
            amountToChange = 1;
        }
    }
    else if (request.voteType == "lame") {
        voterType = "lamer";
        if (lamed) {
            return res.status(200).send();
        }
        if (famed) {
            await Comment.updateOne({ _id: commentID }, {
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
        let result = await Comment.updateOne({ _id: commentID }, {
            $addToSet: {
                [voterType]: username
            }
        });
        if (result.modifiedCount > 0) {
            await Comment.updateOne({ _id: commentID }, {
                $inc: {
                    fame_count: amountToChange
                }
            });
            return res.status(200).send();
        }
    }
    return res.status(400).send();
}


/**
 * Update comment with the inputted information, only inputted field will be updated
 * @param {*} req content: the updated content
 * @param {*} res 
 */
export const updateComment = async (req, res) => {
    const request = req.body;
    const user = req.user.username;
    try {
        var comment = await Comment.findById(req.params.c_id);
        if (user != comment.creator) {
            res.status(400).json({ error: "You do not have permission for this change" });
        }
        comment.content = request.content;
        await comment.save();
        res.status(200).send({ data: comment });
    } catch {
        res.status(404).json({ error: "Comment doesn't exist!" });
    }

}