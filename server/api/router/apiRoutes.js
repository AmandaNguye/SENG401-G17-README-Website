import express from "express";
import got from "got";
import dotenv from "dotenv";

dotenv.config();
import { verifyJWT, verifyJWTRequired } from "../controller/verifyJWT.js"

const router = express.Router();
const postURL = process.env.POST_URL;
const userURL = process.env.USER_URL;
const commentURL = process.env.COMMENT_URL;

router.post("/login", async (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.sendStatus(400);
    }
    else {
        const response = await got.post(userURL + "login", {
            json: {
                "username": req.body.username,
                "password": req.body.password
            }
        }).json();
        res.send(response);
    }
});

router.get("/isUserAuth", async (req, res) => {
    const response = await got.get(userURL + "isUserAuth", {
        headers: {
            "x-access-token": req.headers["x-access-token"]
        }
    }).json();
    res.send(response);
});

router.post("/register", async (req, res) => {
    if (!req.body.username || !req.body.email || !req.body.password) {
        res.sendStatus(400);
    }
    else {
        const response = await got.post(userURL + "register", {
            json: {
                "username": req.body.username,
                "email": req.body.email,
                "password": req.body.password
            }
        }).json();
        res.send(response);
    }
});

export default router;