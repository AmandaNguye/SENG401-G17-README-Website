import bcrypt from "bcrypt";

import User from "../models/user.js";

export const registerUser = async (req, res) => {
  const user = req.body;
  try {
    const takenUsername = await User.findOne({ username: user.username });
    const takenEmail = await User.findOne({ email: user.email });
    if (!req.body.password) {
      return res.sendStatus(404);
    }
    if (takenUsername || takenEmail) {
      res.json({ message: "Username or email has already been taken" });
    } else {
      user.password = await bcrypt.hash(req.body.password, 10);

      const dbUser = new User({
        username: user.username.toLowerCase(),
        email: user.email.toLowerCase(),
        password: user.password,
      });

      dbUser.save();
      res.json({ message: "Success" });
    }
  } catch (e) {
    res.status(404).json({ message: e });
  }
};
