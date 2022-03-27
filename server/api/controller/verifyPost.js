import got from "got";
import { GoogleAuth } from "google-auth-library";

const postURL = process.env.POST_URL;
const auth = new GoogleAuth();
let client;

export const verifyPost = async (req, res, next) => {
    try {
        if (!client) client = await auth.getIdTokenClient(postURL);
        const header = await client.getRequestHeaders();
        const post = await got.get(postURL + "/posts/" + req.params.p_id, {
            headers: {
                "Authorization": header["Authorization"]
            }
        }).json();
        next();
    }
    catch (err) {
        res.status(404).json({ error: "Post doesn't exist!" });
    }
}