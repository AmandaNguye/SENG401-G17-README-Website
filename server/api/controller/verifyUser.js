import got from "got";
import { GoogleAuth } from "google-auth-library";

const userURL = process.env.USER_URL;
const auth = new GoogleAuth();
let client;

export const verifyUser = async (req, res, next) => {
    try {
        if (!client) client = await auth.getIdTokenClient(userURL);
        const header = await client.getRequestHeaders();
        const user = await got.get(userURL, {
            headers: {
                "x-access-token": req.headers["x-access-token"],
                "Authorization": header["Authorization"]
            }
        }).json();

        if (!user.username) {
            return res.status(404).json({
                message: "Failed To Authenticate",
            });
        }
        else {
            next();
        }
    }
    catch (err) {
        next(err);
    }
}