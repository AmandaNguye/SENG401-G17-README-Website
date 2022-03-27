import express from "express";
import got from "got";
import { GoogleAuth } from "google-auth-library";

const router = express.Router();
const userURL = process.env.USER_URL;
const auth = new GoogleAuth();
let client;

router.post("/login", async (req, res, next) => {
    if (!req.body.username || !req.body.password) {
        res.sendStatus(400);
    }
    else {
        try {
            if (!client) client = await auth.getIdTokenClient(userURL);
            const header = await client.getRequestHeaders();
            const response = await got.post(userURL + "/login", {
                headers: {
                    "Authorization": header["Authorization"]
                },
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
        if (!client) client = await auth.getIdTokenClient(userURL);
        const header = await client.getRequestHeaders();
        const response = await got.get(userURL + "/isUserAuth", {
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

router.post("/register", async (req, res, next) => {
    if (!req.body.username || !req.body.email || !req.body.password) {
        res.sendStatus(400);
    }
    else {
        try {
            if (!client) client = await auth.getIdTokenClient(userURL);
            const header = await client.getRequestHeaders();
            const response = await got.post(userURL + "/register", {
                headers: {
                    "Authorization": header["Authorization"]
                },
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