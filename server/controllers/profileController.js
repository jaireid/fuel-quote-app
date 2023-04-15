const express = require('express');
const mysql = require('mysql');
const router = express.Router();

let profiles = [
    { name: "mark", city: 'houston', region: "tx", zipcode: 77777, address1: "101 main street", address2: '101 Main Street' },
    { name: "john", city: 'houston', region: "tx", zipcode: 77777, address1: "101 main street", address2: '101 Main Street' },
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

// Create a new quote and send to database
router.post('/', (req, res) => {
    if (!req.body.name || !req.body.address1 || !req.body.address2 || !req.body.city || !req.body.region || !req.body.zipcode) {
        res.status(400).send('Missing required fields');
        return;
    }

    const name = req.body.name;
    const address1 = req.body.address1;
    const address2 = req.body.address2;
    const city = req.body.city;
    const region = req.body.region;
    const zipcode = Number(req.body.zipcode);

    const query = `INSERT INTO sql9598279.customer_accounts(customer_name, customer_city, customer_state, customer_zipcode, customer_address1, customer_address2) VALUES('${name}', '${city}', '${region}', '${zipcode}', '${address1}', '${address2}')`;

    db.query(query, function(err, result, fields) {
        if (err) throw err;

        const profile = {
            id: result.insertId,
            name: name,
            city: city,
            region: region,
            zipcode: zipcode,
            address1: address1,
            address2: address2
        };
    
        profiles.push(profile);
        res.send(profile);
    });
});

module.exports = router;