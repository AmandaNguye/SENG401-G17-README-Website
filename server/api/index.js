import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import Router from "./router/apiRoutes.js"

const app = express();

dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: "true" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: "true" }));
app.use(cors());

app.use('/', Router);

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));