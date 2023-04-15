const express = require('express');
const mysql = require('mysql');
const router = express.Router();

let fill = {
    address: '101 Main Street',
    // price: 2
};

let quotes = [
    { id: 1, gallons: 5, deliveryDate: "2015-03-25", address: '101 Main Street', price: 3, due: 15 },
    { id: 2, gallons: 10, deliveryDate: "2015-03-25", address: '101 Main Street', price: 2, due: 20 },
];

const db = mysql.createConnection
    ({
        host: 'sql9.freemysqlhosting.net',
        user: 'sql9598279',
        password: '55U3QzBa79',
        database: 'sql9598279'
    });

db.connect((err) => {
    if (err) throw err;
    else{console.log('Connected to MySQL Server!');}

    db.query("SELECT customer_state FROM sql9598279.customer_accounts;", function (err, result, fields)
    {
        if (err) throw err;
        //else{console.log(result);}
    });
});

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

    const gallons = Number(req.body.gallons);
    const date = req.body.deliveryDate;
    const price = Number(req.body.price);
    const due = Number(req.body.due);
    const address = req.body.address;

    const query = `INSERT INTO sql9598279.quotes(gallons, deliveryDate, address, price, due) VALUES('${gallons}', '${date}', '${address}', '${price}', ${due})`;

    db.query(query, function(err, result, fields) {
        if (err) throw err;

        const quote = {
            id: result.insertId,
            gallons: gallons,
            deliveryDate: date,
            address: address,
            price: price,
            due: due,
        };

        quotes.push(quote);
        res.send(quote);
    });
});

module.exports = router;