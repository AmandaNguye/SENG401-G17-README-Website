import got from "got";
import { GoogleAuth } from "google-auth-library";

const commentURL = process.env.COMMENT_URL;
const auth = new GoogleAuth();
let client;

export const deleteCommentsByPost = async (req, res, next) => {
    try {
        if (!client) client = await auth.getIdTokenClient(commentURL);
        const header = await client.getRequestHeaders();
        const post = await got.delete(commentURL + "/posts/" + req.params.p_id, {
            headers: {
                "Authorization": header["Authorization"]
            }
        }).json();
        next();
    }
    catch (err) {
        next(err);
    }
}