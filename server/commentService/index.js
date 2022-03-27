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

const PORT = process.env.PORT || 5002;
const CONNECTION_URL = `mongodb+srv://${process.env.USER}:${process.env.PW}@cluster0.mw5kc.mongodb.net/seng401?retryWrites=true&w=majority`;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
