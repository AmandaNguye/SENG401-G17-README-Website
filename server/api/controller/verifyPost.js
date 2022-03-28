import got from "got";

const postURL = process.env.POST_URL + "/posts";


export const verifyPost = async (req, res, next) => {
    try {

        const post = await got.get(postURL + "/" + req.params.p_id).json();
        next();
    }
    catch (err) {
        res.status(404).json({ error: "Post doesn't exist!" });
    }
}