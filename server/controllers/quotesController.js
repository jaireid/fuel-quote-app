const express = require('express');
const router = express.Router();

let quotes = [
    { id: 1, address: '101 Main Street', price: '3.00', due: '45' },
    { id: 2, address: '321 Film Street', price: '5.00', due: '60' }
];

// Get all quotes
router.get('/', (req, res) => {
    res.json(quotes);
});

// Get a specific quote
router.get('/:id', (req, res) => {
    const quote = quotes.find(q => q.id === parseInt(req.params.id));
    
    if (!quote) return res.status(404).send('Quote not found');

    res.json(quote);
});
  
// Create a new quote
router.post('/', (req, res) => {
    const quote = {
      id: quotes.length + 1,
      address: req.body.address,
      price: req.body.price,
      due: req.body.due,
    };

    quotes.push(quote);
    res.send(quote);
});

module.exports = router;