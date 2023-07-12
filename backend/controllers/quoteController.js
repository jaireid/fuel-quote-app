import asyncHandler from "express-async-handler";
import Quote from "../models/quoteModel.js";
import User from "../models/userModel.js";
import { calculateDiscountedPrice } from "../utils/calculateDiscount.js";

// @desc    Create a new quote
// @route   POST /api/quotes
// @access  Private
const createQuote = asyncHandler(async (req, res) => {
  const { gallons, deliveryDate } =
    req.body;
  const user = await User.findById(req.user._id);

  if (user) {
    // Base price of fuel per gallon
    const basePrice = 3.0;

    const suggestedPrice = calculateDiscountedPrice(basePrice, user);

    const amountDue = gallons * suggestedPrice;

    const quote = await Quote.create({
      gallons,
      deliveryDate,
      suggestedPrice,
      amountDue,
      address: user.address,
      zipcode: user.zipcode,
      state: user.state,
      city: user.city,
    });

    if (quote) {
      user.quotes.push(quote._id);
      await user.save();
      res.status(201).json(quote);
    } else {
      res.status(400);
      throw new Error("Quote not found");
    }
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get quote by ID
// @route   GET /api/quotes/:id
// @access  Private
const getQuoteById = asyncHandler(async (req, res) => {
  const quote = await Quote.findById(req.quote._id);

  if (quote) {
    res.json(quote);
  } else {
    res.status(404);
    throw new Error("Quote not found");
  }
});

// @desc    Get quotes by user ID
// @route   GET /api/quotes/user/:userId
// @access  Private
const getUserQuotes = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate("quotes");

  if (user) {
    // Access the populated quotes array and send it in the response
    const quotes = user.quotes.map((quote) => {
      return {
        _id: quote._id,
        gallons: quote.gallons,
        address: quote.address,
        zipcode: quote.zipcode,
        state: quote.state,
        city: quote.city,
        deliveryDate: quote.deliveryDate,
        suggestedPrice: quote.suggestedPrice,
        amountDue: quote.amountDue
      };
    });
    res.json(quotes);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { createQuote, getQuoteById, getUserQuotes };
