import express from "express";


import { getCommentByID, getComments } from "../controllers/getComment.js"
import { createComment } from "../controllers/createComment.js"
import { deleteComment } from "../controllers/deleteComment.js"
import { voteComment, updateComment } from "../controllers/updateComment.js"

const router = express.Router();

//p_id: id of the post
//c_id: id of the comment
//Route is fully display in here because we need to capture post id


router.get("/:p_id/comments/", getComments);

router.get("/:p_id/comments/:c_id", getCommentByID);

router.post("/:p_id/comments/", createComment);

router.delete("/:p_id/comments/:c_id", deleteComment);

router.put("/:p_id/comments/:c_id/vote", voteComment);

router.patch("/:p_id/comments/:c_id", updateComment);

export default router;