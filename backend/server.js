import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const port = process.env.PORT || 5002;

const server = app;

server.listen(port, () => console.log(`Server started on port ${port}`));