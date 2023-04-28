const express = require('express');
// const db = require('../config/db');
const router = express.Router();
const mysql = require('mysql');

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

// Middleware to protect routes
// router.post('/', (req, res, next) => {
//     if(req.session.userID) {
//         res.redirect('/quote');
//     } else {
//         res.redirect('/login');
//     }
// });

router.post('/logout', (req, res) => {
    req.session.destroy((error) => {
        if (err) throw err;
        res.redirect('/login');
    });
});

module.exports = router;
