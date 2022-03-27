import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import userRouter from "./router/userRoutes.js"
import postRouter from "./router/postRoutes.js"
import commentRouter from "./router/commentRoutes.js"

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: "true" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: "true" }));
app.use(cors());

app.use('/posts', commentRouter);
app.use('/posts', postRouter);
app.use('/', userRouter);

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send();
})

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));