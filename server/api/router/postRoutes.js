import express from "express";
import got from "got";
import { verifyUser } from "../controller/verifyUser.js";
import { deleteCommentsByPost } from "../controller/deleteCommentsbyPost.js";
import { GoogleAuth } from "google-auth-library";

const auth = new GoogleAuth();

const router = express.Router();
const postURL = process.env.POST_URL;

let client;

router.get("/", async (req, res, next) => {
    try {
        const { page = 0, limit = 10, q } = req.query;
        let url;
        if (q) {
            url = postURL + "/posts/?page=" + page
                + "&limit=" + limit
                + "&q=" + q;
        }
        else {
            url = postURL + "/posts/?page=" + page + "&limit=" + limit;
        }
        if (!client) client = await auth.getIdTokenClient(postURL);
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

router.get("/user/:name", async (req, res, next) => {
    try {
        const { page = 0, limit = 10 } = req.query;
        const url = postURL + "/posts/user/" + req.params.name + "?page=" + page + "&limit=" + limit;
        if (!client) client = await auth.getIdTokenClient(postURL);
        const header = await client.getRequestHeaders();
        const response = await got.get(url, {
            headers: {
                "x-access-token": req.headers["x-access-token"],
                "Authorization": header["Authorization"]
            }
        }).json();
        res.send(response);
    } catch (err) {
        next(err)
    };
});

router.get("/:id", async (req, res, next) => {
    try {
        if (!client) client = await auth.getIdTokenClient(postURL);
        const header = await client.getRequestHeaders();
        const response = await got.get(postURL + "/posts/" + req.params.id, {
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

router.post("/", verifyUser, async (req, res, next) => {

    if (!req.body.title || !req.body.content) {
        res.status(404).json({
            message: "Invalid request",
        });
    }
    else {

        try {
            if (!client) client = await auth.getIdTokenClient(postURL);
            const header = await client.getRequestHeaders();
            const response = await got.post(postURL + "/posts/", {
                headers: {
                    "x-access-token": req.headers["x-access-token"],
                    "Authorization": header["Authorization"]
                },
                json: {
                    title: req.body.title,
                    content: req.body.content,
                    tag: req.body.tag
                },
            }).json();
            res.send(response);
        } catch (err) {
            next(err);
        }
    }
});

router.delete("/:id", verifyUser, async (req, res, next) => {

    try {
        if (!client) client = await auth.getIdTokenClient(postURL);
        const header = await client.getRequestHeaders();
        const response = await got.delete(postURL + "/posts/" + req.params.id, {
            headers: {
                "x-access-token": req.headers["x-access-token"],
                "Authorization": header["Authorization"]
            },
        }).json();

        res.send(response);
    } catch (err) {
        next(err);
    }
}, deleteCommentsByPost);

router.patch("/:id/vote", verifyUser, async (req, res, next) => {

    try {
        if (!client) client = await auth.getIdTokenClient(postURL);
        const header = await client.getRequestHeaders();
        const response = await got.patch(postURL + "/posts/" + req.params.id + "/vote", {
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

router.patch("/:id", verifyUser, async (req, res, next) => {

    try {
        if (!client) client = await auth.getIdTokenClient(postURL);
        const header = await client.getRequestHeaders();
        const response = await got.patch(postURL + "/posts/" + req.params.id, {
            headers: {
                "x-access-token": req.headers["x-access-token"],
                "Authorization": header["Authorization"]
            },
            json: {
                update: req.body.update
            },
        }).json();
        res.send(response);
    } catch (err) {
        next(err);
    }
});


export default router;