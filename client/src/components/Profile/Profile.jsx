const express = require('express');
const router = express.Router();

let fill = {
    address: '101 Main Street',
    price: 2
};

let profiles = [
    { name: "mark", address1: "101 main street", address2: null, city: 'houston', region: "tx", zipcode: 77777 },
    { name: "john", address1: "101 main street", address2: null, city: 'houston', region: "tx", zipcode: 77777 },
];

// Create a new quote and send to database
router.post('/', (req, res) => {
    // if (!req.body.gallons || !req.body.deliveryDate) {
    //     res.status(400).send('Missing required fields');
    //     return;
    // }

    const profile = {
      name: req.body.name,
      address1: req.body.address1,
      address2: req.body.address2,
      city: req.body.city,
      state: req.body.region,
      zipcode: req.body.zipcode
    };

    profiles.push(profile);
    res.send(profile);
});

module.exports = router;