import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import Routes from "./routes/commentRoutes.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: "true" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: "true" }));
app.use(cors());

app.use('/posts', Routes);

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error.message));

export default app;