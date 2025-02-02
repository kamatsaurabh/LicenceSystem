import { config } from "dotenv";
config({
    path: "./.env",
});
import express from "express";
import { connectDB } from "./utils/features.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import userRoute from "./routes/userRoute.js";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 4000;
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", userRoute);

app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`Express is working on http://localhost:${port}`);
});