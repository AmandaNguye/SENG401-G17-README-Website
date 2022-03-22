import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const login = (req, res) => {
  const userLoggingIn = req.body;

  User.findOne({ username: userLoggingIn.username }).then((dbUser) => {
    if (!dbUser) {
      return res.json({ message: "Invalid Username or Password" });
    }
    bcrypt
      .compare(userLoggingIn.password, dbUser.password)
      .then((isCorrect) => {
        if (isCorrect) {
          const payload = {
            id: dbUser._id,
            username: dbUser.username,
          };
          jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 86400 },
            (err, token) => {
              if (err) return res.json({ message: "err" });
              return res.json({
                message: "Success",
                token: "Bearer " + token,
                userID: dbUser._id,
              });
            }
          );
        } else {
          return res.json({ message: "Invalid Username or Password" });
        }
      });
  });
};
