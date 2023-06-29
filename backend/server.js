import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const port = process.env.PORT || 5002;
const app = express();

// Parse raw JSON
app.use(express.json());
// Send form data
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => res.send("Server is ready!"));

app.listen(port, () => console.log(`Server started on port ${port}`));