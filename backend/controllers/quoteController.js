import asyncHandler from "express-async-handler";
import Quote from "../models/quoteModel.js";
import User from "../models/userModel.js";
import { calculateDiscountedPrice } from "../utils/calculateDiscount.js";

// @desc    Create a new quote
// @route   POST /api/quotes
// @access  Private
const createQuote = asyncHandler(async (req, res) => {
  const { gallons, deliveryDate } = req.body;
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

export { createQuote };
