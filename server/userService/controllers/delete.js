import User from "../models/user.js";

export const deleteUser = async (req, res) => {
    const username = req.params.user;
    const result = await User.deleteOne({ username: username });
    res.json({
        deletedCount: result.deletedCount
    });
}