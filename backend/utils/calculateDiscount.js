const calculateDiscountedPrice = (basePrice, user) => {
  // Check if the user is a returning customer
  const isReturningCustomer = user.quotes.length > 0;

  // Calculate the base price for new customers
  let suggestedPrice = isReturningCustomer ? basePrice * 0.98 : basePrice; // 2% discount for returning customers

  // Apply state-based discounts
  switch (user.state) {
    case "TX":
    case "LA":
      suggestedPrice *= 0.9; // 10% discount for Texas and Louisiana
      break;
    case "WA":
    case "OR":
      suggestedPrice *= 0.92; // 8% discount for Washington and Oregon
      break;
    case "CA":
    case "NV":
    case "AZ":
      suggestedPrice *= 0.95; // 5% discount for California, Nevada, and Arizona
      break;
    default:
      // No discount for other states
      break;
  }

  return suggestedPrice;
};

export { calculateDiscountedPrice };
