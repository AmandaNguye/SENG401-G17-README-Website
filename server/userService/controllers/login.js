import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const login = (req, res) => {
  const userLoggingIn = req.body;
  try {
    if (!req.body.username || !req.body.password) {
      return res.sendStatus(404);
    }

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
                  username: dbUser.username,
                });
              }
            );
          } else {
            return res.json({ message: "Invalid Username or Password" });
          }
        });
    }
    );
  } catch {
    res.sendStatus(404);
  }
};
