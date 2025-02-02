import express from "express";
import { config } from "dotenv";

const app = express();

config({
    path: "./.env",
});

const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API Working with /api/v1");
});


app.listen(port, () => {
    console.log(`Express is working on http://localhost:${port}`);
});