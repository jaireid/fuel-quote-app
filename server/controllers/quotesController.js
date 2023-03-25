const express = require('express');
const router = express.Router();

let fill = {
    address: '101 Main Street',
    price: 2
};

let quotes = [
    { id: 1, gallons: 5, deliveryDate: null, address: '101 Main Street', price: 3, due: 15 },
    { id: 2, gallons: 10, deliveryDate: null, address: '101 Main Street', price: 2, due: 20 },
];

// Get all quotes from database
router.get('/', (req, res) => {
    res.json(quotes);
});

// Get user data to fill quote
router.get('/fill', (req, res) => {
    const data = fill;

    if (!data) return res.status(404).send('Fill info not found');

    res.json(data);
});
  
// Create a new quote and send to database
router.post('/', (req, res) => {
    if (!req.body.gallons || !req.body.deliveryDate) {
        res.status(400).send('Missing required fields');
        return;
    }

    // const gallons = Number(req.body.gallons);
    const price = fill.price;

    const quote = {
      id: quotes.length + 1,
      gallons: Number(req.body.gallons),
      deliveryDate: new Date(req.body.deliveryDate),
      address: '101 Main Street',
      price: price,
      due: Number(req.body.due),
    };

    quotes.push(quote);
    res.send(quote);
});

module.exports = router;