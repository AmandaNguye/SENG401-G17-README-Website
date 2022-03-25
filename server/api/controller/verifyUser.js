import got from "got";

const userURL = process.env.USER_URL;


export const verifyUser = async (req, res, next) => {
    try {
        const user = await got.get(userURL, {
            headers: {
                "x-access-token": req.headers["x-access-token"]
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