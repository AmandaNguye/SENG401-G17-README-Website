import express from "express";
import got from "got";
import dotenv from "dotenv";
import { verifyUser } from "../controller/verifyUser.js";
import { verifyPost } from "../controller/verifyPost.js";

dotenv.config();

const router = express.Router();


router.get("/:p_id/comments/", async (req, res, next) => {
    const commentURL = process.env.COMMENT_URL + "/posts/" + req.params.p_id + "/comments";
    const { page = 0, limit = 10 } = req.query;
    let url;
    url = commentURL + "?page=" + page + "&limit=" + limit;

    try {
        const response = await got.get(url, {
            headers: {
                "x-access-token": req.headers["x-access-token"]
            }
        }).json();
        res.send(response);
    }
    catch (err) {
        next(err);
    }
});

router.get("/:p_id/comments/:c_id", async (req, res, next) => {
    const commentURL = process.env.COMMENT_URL + "/posts/" + req.params.p_id + "/comments";
    try {
        const response = await got.get(commentURL + "/" + req.params.c_id, {
            headers: {
                "x-access-token": req.headers["x-access-token"]
            }
        }).json();
        res.send(response);
    }
    catch (err) {
        next(err);
    }
});

router.post("/:p_id/comments", verifyUser, verifyPost, async (req, res, next) => {
    const commentURL = process.env.COMMENT_URL + "/posts/" + req.params.p_id + "/comments";
    if (!req.body.content) {
        res.status(404).json({
            message: "Invalid request",
        });
    }
    else {
        try {
            const response = await got.post(commentURL + "/", {
                headers: {
                    "x-access-token": req.headers["x-access-token"]
                },
                json: {
                    content: req.body.content
                },
            }).json();
            res.send(response);
        } catch (err) {
            next(err);
        }
    }
});

router.delete("/:p_id/comments/:c_id", verifyUser, async (req, res, next) => {
    const commentURL = process.env.COMMENT_URL + "/posts/" + req.params.p_id + "/comments";
    try {
        const response = await got.delete(commentURL + "/" + req.params.c_id, {
            headers: {
                "x-access-token": req.headers["x-access-token"]
            },
        }).json();
        res.send(response);
    } catch (err) {
        next(err);
    }
});

router.patch("/:p_id/comments/:c_id/vote", verifyUser, async (req, res, next) => {
    const commentURL = process.env.COMMENT_URL + "/posts/" + req.params.p_id + "/comments";
    try {
        const response = await got.patch(commentURL + "/" + req.params.c_id + "/vote", {
            headers: {
                "x-access-token": req.headers["x-access-token"]
            },
            json: {
                "voteType": req.body.voteType
            }
        }).json();
        res.send(response);
    }
    catch (err) {
        next(err);
    }
});

router.patch("/:p_id/comments/:c_id", verifyUser, async (req, res, next) => {
    const commentURL = process.env.COMMENT_URL + "/posts/" + req.params.p_id + "/comments";
    try {
        const response = await got.patch(commentURL + "/" + req.params.c_id, {
            headers: {
                "x-access-token": req.headers["x-access-token"]
            },
            json: {
                content: req.body.content
            },
        }).json();
        res.send(response);
    } catch (err) {
        next(err);
    }
});


export default router;