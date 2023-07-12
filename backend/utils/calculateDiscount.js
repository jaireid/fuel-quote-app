const calculateDiscountedPrice = (basePrice, user) => {
  // Check if the user is a returning customer
  const isReturningCustomer = user.quotes.length > 0;

  // Calculate the base price for new customers
  let suggestedPrice = isReturningCustomer ? basePrice * 0.98 : basePrice; // 2% discount for returning customers

  // Apply state-based discounts
  switch (user.state) {
    case "Texas":
    case "Louisiana":
      suggestedPrice *= 0.9; // 10% discount for Texas and Louisiana
      break;
    case "Washington":
    case "Oregon":
      suggestedPrice *= 0.92; // 8% discount for Washington and Oregon
      break;
    case "California":
    case "Nevada":
    case "Arizona":
      suggestedPrice *= 0.95; // 5% discount for California, Nevada, and Arizona
      break;
    default:
      // No discount for other states
      break;
  }

  return Math.round(suggestedPrice * 100) / 100;
};

export { calculateDiscountedPrice };
