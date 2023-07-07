import express from "express";
import dotenv from "dotenv";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import quoteRoutes from "./routes/quoteRoutes.js";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

// Parse raw JSON
app.use(express.json());
// Send form data
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDB();

// User routes
app.use("/api/users", userRoutes);

// Quote routes
app.use("/api/quotes", quoteRoutes);

// Handle errors
app.use(notFound);
app.use(errorHandler);

export default app;
