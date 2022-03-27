import express from "express";
import got from "got";
import { verifyUser } from "../controller/verifyUser.js";
import { verifyPost } from "../controller/verifyPost.js";
import { GoogleAuth } from "google-auth-library";

const router = express.Router();
const commentURL = process.env.COMMENT_URL;

const auth = new GoogleAuth();
let client;

router.get("/:p_id/comments/", async (req, res, next) => {
    const { page = 0, limit = 10 } = req.query;
    const url = commentURL + "/posts/" + req.params.p_id + "/comments?page=" + page + "&limit=" + limit;

    try {
        if (!client) client = await auth.getIdTokenClient(commentURL);
        const header = await client.getRequestHeaders();
        const response = await got.get(url, {
            headers: {
                "x-access-token": req.headers["x-access-token"],
                "Authorization": header["Authorization"]
            }
        }).json();
        res.send(response);
    }
    catch (err) {
        next(err);
    }
});

router.get("/:p_id/comments/:c_id", async (req, res, next) => {
    const url = commentURL + "/posts/" + req.params.p_id + "/comments";
    try {
        if (!client) client = await auth.getIdTokenClient(commentURL);
        const header = await client.getRequestHeaders();
        const response = await got.get(url + "/" + req.params.c_id, {
            headers: {
                "x-access-token": req.headers["x-access-token"],
                "Authorization": header["Authorization"]
            }
        }).json();
        res.send(response);
    }
    catch (err) {
        next(err);
    }
});

router.post("/:p_id/comments", verifyUser, verifyPost, async (req, res, next) => {
    const url = commentURL + "/posts/" + req.params.p_id + "/comments";
    if (!req.body.content) {
        res.status(404).json({
            message: "Invalid request",
        });
    }
    else {
        try {
            if (!client) client = await auth.getIdTokenClient(commentURL);
            const header = await client.getRequestHeaders();
            const response = await got.post(url + "/", {
                headers: {
                    "x-access-token": req.headers["x-access-token"],
                    "Authorization": header["Authorization"]
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
    const url = commentURL + "/posts/" + req.params.p_id + "/comments";
    try {
        if (!client) client = await auth.getIdTokenClient(commentURL);
        const header = await client.getRequestHeaders();
        const response = await got.delete(url + "/" + req.params.c_id, {
            headers: {
                "x-access-token": req.headers["x-access-token"],
                "Authorization": header["Authorization"]
            },
        }).json();
        res.send(response);
    } catch (err) {
        next(err);
    }
});

router.patch("/:p_id/comments/:c_id/vote", verifyUser, async (req, res, next) => {
    const url = commentURL + "/posts/" + req.params.p_id + "/comments";
    try {
        if (!client) client = await auth.getIdTokenClient(commentURL);
        const header = await client.getRequestHeaders();
        const response = await got.patch(url + "/" + req.params.c_id + "/vote", {
            headers: {
                "x-access-token": req.headers["x-access-token"],
                "Authorization": header["Authorization"]
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

export default router;