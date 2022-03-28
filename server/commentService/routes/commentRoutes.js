import express from "express";
import jwt from "jsonwebtoken";

import { getCommentByID, getComments } from "../controllers/getComment.js"
import { createComment } from "../controllers/createComment.js"
import { deleteComment } from "../controllers/deleteComment.js"
import { voteComment } from "../controllers/updateComment.js"

const router = express.Router();

//p_id: id of the post
//c_id: id of the comment
//Route is in here because we need to capture post id

function verifyJWTRequired(req, res, next) {
    const token = req.headers["x-access-token"]?.split(" ")[1];

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err)
                return res.json({
                    isLoggedIn: false,
                    message: "Failed To Authenticate",
                });
            req.user = {};
            req.user.id = decoded.id;
            req.user.username = decoded.username;
            next();
        });
    } else {
        res.json({ message: "Incorrect Token Given", isLoggedIn: false });
    }
}

function verifyJWT(req, res, next) {
    const token = req.headers["x-access-token"]?.split(" ")[1];

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err)
                return res.json({
                    isLoggedIn: false,
                    message: "Failed To Authenticate",
                });
            req.user = {};
            req.user.id = decoded.id;
            req.user.username = decoded.username;
            next();
        });
    }
    else {
        req.user = {};
        req.user.username = "";
        next();
    }
}

router.get("/:p_id/comments/", verifyJWT, getComments);

router.get("/:p_id/comments/:c_id", verifyJWT, getCommentByID);

router.post("/:p_id/comments/", verifyJWTRequired, createComment);

router.delete("/:p_id/comments/:c_id", verifyJWTRequired, deleteComment);

router.patch("/:p_id/comments/:c_id/vote", verifyJWTRequired, voteComment);

export default router;