import asyncHandler from "express-async-handler";
import Quote from "../models/quoteModel.js";
import User from "../models/userModel.js";

// @desc    Create a new quote
// @route   POST /api/quotes
// @access  Private
const createQuote = asyncHandler(async (req, res) => {
    const { gallons, state, city, deliveryDate, suggestedPrice, amountDue } = req.body;
    const user = req.user;

    const quote = await Quote.create({
        gallons,
        state,
        city,
        deliveryDate,
        suggestedPrice,
        amountDue
    });

    user.quotes.push(quote._id);
    await user.save();

    res.status(201).json(quote);
});