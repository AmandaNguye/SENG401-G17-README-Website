import User from "../models/user.js";

export const find = async (req, res) => {
    const userLoggingIn = req.body;
    const user = await User.findById(req.user.id);
    res.json({
        username: user.username,
        email: user.email,
    });
}