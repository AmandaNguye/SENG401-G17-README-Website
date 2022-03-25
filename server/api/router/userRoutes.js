import express from "express";
import got from "got";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const userURL = process.env.USER_URL;

router.post("/login", async (req, res, next) => {
    if (!req.body.username || !req.body.password) {
        res.sendStatus(400);
    }
    else {
        try {
            const response = await got.post(userURL + "/login", {
                json: {
                    "username": req.body.username,
                    "password": req.body.password
                }
            }).json();
            res.send(response);
        }
        catch (err) {
            next(err);
        }
    }
});

router.get("/isUserAuth", async (req, res, next) => {
    try {
        const response = await got.get(userURL + "/isUserAuth", {
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

router.post("/register", async (req, res, next) => {
    if (!req.body.username || !req.body.email || !req.body.password) {
        res.sendStatus(400);
    }
    else {
        try {
            const response = await got.post(userURL + "/register", {
                json: {
                    "username": req.body.username,
                    "email": req.body.email,
                    "password": req.body.password
                }
            }).json();
            res.send(response);
        }
        catch (err) {
            next(err);
        }
    }
});

export default router;