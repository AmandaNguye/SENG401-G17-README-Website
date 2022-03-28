import express from "express";
import jwt from "jsonwebtoken";

import { registerUser } from "../controllers/registerUser.js";
import { login } from "../controllers/login.js";
import { find } from "../controllers/find.js";
import { deleteUser } from "../controllers/delete.js";

const router = express.Router();

function verifyJWT(req, res, next) {
  const token = req.headers["x-access-token"]?.split(" ")[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err)
        return res.json({
          isLoggedIn: false,
          message: "Failed To Authenticate",
        });
      req.user = {};
      req.user.id = decoded.id;
      req.user.username = decoded.username;
      next();
    });
  } else {
    res.json({ message: "Incorrect Token Given", isLoggedIn: false });
  }
}

router.post("/register", registerUser);
router.post("/login", login);
router.get("/", verifyJWT, find);
router.delete("/:user", deleteUser);
router.get("/isUserAuth", verifyJWT, (req, res) => {
  res.json({ isLoggedIn: true, username: req.user.username });
});

export default router;
