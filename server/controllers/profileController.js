const express = require('express');
const mysql = require('mysql');
const router = express.Router();

let profiles = [
    { id: 250, name: "mark", city: 'houston', region: "tx", zipcode: 77777, address1: "101 main street", address2: '101 Main Street' },
    { id: 251, name: "john", city: 'houston', region: "tx", zipcode: 77777, address1: "101 main street", address2: '101 Main Street' },
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
});

router.get('/fill', (req, res) => {
    const data = profiles;

    if (!data) return res.status(404).send('Fill info not found');

    res.json(data);
});

// Create a new quote and send to database
router.post('/', (req, res) => {
    if (!req.body.name || !req.body.address1 || !req.body.address2 || !req.body.city || !req.body.region || !req.body.zipcode) {
        res.status(400).send('Missing required fields');
        return;
    }
    
    const id = req.body.id; 
    const name = req.body.name;
    const address1 = req.body.address1;
    const address2 = req.body.address2;
    const city = req.body.city;
    const region = req.body.region;
    const zipcode = Number(req.body.zipcode);

    if (name.length > 50)
    {
        res.status(400).send('Name cannot exceed 50 characters');
        return;
    }
    if (address1.length > 100)
    {
        res.status(400).send('Address 1 cannot exceed 100 characters');
        return;
    }
    if (city.length > 100)
    {
        res.status(400).send('City cannot exceed 100 characters');
        return;
    }
    if (zipcode.toString().length < 5 || zipcode.toString().length > 9)
    {
        res.status(400).send('Zipcode must be between 5 and 9 digits');
        return;
    }
    
    const query = `UPDATE customer_accounts SET customer_name = ${name}, customer_city = ${city}, customer_address1 = ${address1}, customer_address2 = ${address2}, customer_city = ${city}, customer_state = ${region}, customer_zipcode = ${zipcode} WHERE customer_id = ${userID}
    `;
    db.query(query, function(err, result, fields) {
        if (err) throw err;

        const profile = {
            // id: result.insertId,
            id: id+1,
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