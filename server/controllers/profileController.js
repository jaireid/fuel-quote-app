const express = require('express');
// const db = require('../config/db');
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
    //else{console.log('Connected to MySQL Server!');}

    db.query("SELECT username FROM sql9598279.credentials;", function (err, result, fields)
    {
        if (err) throw err;
    });

});

// let profiles = [
//     { name: "mark", city: 'houston', region: "tx", zipcode: 77777, address1: "101 main street", address2: '101 Main Street' },
//     { name: "john", city: 'houston', region: "tx", zipcode: 77777, address1: "101 main street", address2: '101 Main Street' },
// ];

function requireAuth(req, res, next) {
    if(req.session.userID) {
        next();
    } else {
        res.redirect('/login');
    }
}

router.get('/fill', requireAuth, (req, res) => {
    if (!req) return res.status(404).send('Fill info not found');

    const query = `SELECT * FROM sql9598279.customer_accounts WHERE customer_id = ${req.session.userID}`

    db.query(query, function(err, result, fields) {
        if (err) throw err;

        res.send(result);
    });
});

// Create a new quote and send to database
router.post('/', requireAuth, (req, res) => {
    if (!req.body.name || !req.body.address1 || !req.body.address2 || !req.body.city || !req.body.region || !req.body.zipcode) {
        res.status(400).send('Missing required fields');
        return;
    }
    const userID = req.session.userID
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
    const query = `INSERT INTO sql9598279.customer_accounts(customer_id, customer_name, customer_city, customer_state, customer_zipcode, customer_address1, customer_address2) VALUES('${userID}','${name}', '${city}', '${region}', '${zipcode}', '${address1}', '${address2}')`;

    db.query(query, function(err, result, fields) {
        if (err) throw err;

        // const profile = {
        //     id: result.insertId,
        //     name: name,
        //     city: city,
        //     region: region,
        //     zipcode: zipcode,
        //     address1: address1,
        //     address2: address2
        // };
    
        // profiles.push(profile);
        res.send(profile);
    });
});

module.exports = router;