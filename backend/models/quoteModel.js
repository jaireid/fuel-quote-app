import mongoose from "mongoose";

const quoteSchema = mongoose.Schema(
  {
    gallons: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    zipcode: {
      type: String,
      minLength: 5,
      maxLength: 5,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    deliveryDate: {
      type: Date,
      required: true,
    },
    suggestedPrice: {
      type: Number,
      required: true,
    },
    amountDue: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Quote = mongoose.model("Quote", quoteSchema);

export default Quote;
