const express = require('express');
const router = express.Router();

let quotes = [
    { id: 1, gallons: 3, deliveryDate: '2012-04-23T18:25:43.511Z', address: '101 Main Street', price: 4.25, due: 12.75 },
    { id: 2, galllons: 4, deliveryDate: '2012-04-23T18:25:43.511Z', address: '101 Main Street', price: 3, due: 12 }
];

// Get all quotes from database
router.get('/', (req, res) => {
    res.json(quotes);
});

// Get a specific quote from database
router.get('/:id', (req, res) => {
    const quote = quotes.find(q => q.id === parseInt(req.params.id));

    if (!quote) return res.status(404).send('Quote not found');

    res.json(quote);
});
  
// Create a new quote and send to database
router.post('/', (req, res) => {
    const quote = {
      id: quotes.length + 1,
      gallons: req.body.gallons,
      deliveryDate: req.body.deliveryDate,
      address: '101 Main Street',
      price: 2,
      due: 10,
    };

    quotes.push(quote);
    res.send(quote);
});

module.exports = router;