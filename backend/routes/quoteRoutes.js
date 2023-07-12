import express from "express";
const router = express.Router();
import { createQuote } from "../controllers/quoteController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, createQuote);

export default router;
