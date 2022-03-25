import express from "express";
import got from "got";
import dotenv from "dotenv";
import { verifyUser } from "../controller/verifyUser.js";


dotenv.config();

const router = express.Router();
const postURL = process.env.POST_URL;

router.get("/", async (req, res, next) => {
    try {
        const { page = 0, limit = 10, q } = req.query;
        let url;
        if (q) {
            url = postURL + "/?page=" + page
                + "&limit=" + limit
                + "&q=" + q;
        }
        else {
            url = postURL + "/?page=" + page + "&limit=" + limit;
        }
        const response = await got.get(url + "/", {
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

router.get("/user/:name", async (req, res, next) => {
    try {
        const { page = 0, limit = 10 } = req.query;
        const url = postURL + "/user/" + req.params.name + "?page=" + page + "&limit=" + limit;
        const response = await got.get(url, {
            headers: {
                "x-access-token": req.headers["x-access-token"]
            }
        }).json();
        res.send(response);
    } catch (err) {
        next(err)
    };
});

router.get("/:id", async (req, res, next) => {
    try {
        const response = await got.get(postURL + "/" + req.params.id, {
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

router.post("/", verifyUser, async (req, res, next) => {

    if (!req.body.title || !req.body.content) {
        res.status(404).json({
            message: "Invalid request",
        });
    }
    else {
        try {
            const response = await got.post(postURL + "/", {
                headers: {
                    "x-access-token": req.headers["x-access-token"]
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
        const response = await got.delete(postURL + "/" + req.params.id, {
            headers: {
                "x-access-token": req.headers["x-access-token"]
            },
        }).json();
        res.send(response);
    } catch (err) {
        next(err);
    }
});

router.patch("/:id/vote", verifyUser, async (req, res, next) => {
    try {
        const response = await got.patch(postURL + "/" + req.params.id + "/vote", {
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

router.patch("/:id", verifyUser, async (req, res, next) => {
    try {
        const response = await got.patch(postURL + "/" + req.params.id, {
            headers: {
                "x-access-token": req.headers["x-access-token"]
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