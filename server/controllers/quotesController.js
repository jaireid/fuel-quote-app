const express = require('express');
const mysql = require('mysql');
const router = express.Router();

const db = mysql.createConnection
    ({
        host: 'sql9.freemysqlhosting.net',
        user: 'sql9598279',
        password: '55U3QzBa79',
        database: 'sql9598279'
    });

db.connect((err) => {
    if (err) throw err;
});

router.get('/fill', (req, res) => {
    if (!req) return res.status(404).send('Fill info not found');

    const query = `SELECT * FROM sql9598279.quotes`

    db.query(query, function(err, result, fields) {
        if (err) throw err;

        res.send(result);
    });
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
        res.status(200);
    });
});

module.exports = router;