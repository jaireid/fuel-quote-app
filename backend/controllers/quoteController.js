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

// @desc    Get quote by ID
// @route   GET /api/quotes/:id
// @access  Private
const getQuoteById = asyncHandler(async (req, res) => {
  const quote = await Quote.findById(req.params._id);

  if(quote) {
      res.json(quote);
  } else {
      res.status(404);
      throw new Error("Quote not found");
  }
});

export { 
    createQuote,
    getQuoteById,
    getUserQuotes
};