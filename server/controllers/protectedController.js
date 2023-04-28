const express = require('express');
const router = express.Router();
const mysql = require('mysql');
// const db = require('../config/db');

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
});

// Middleware to protect routes
// router.post('/', (req, res, next) => {
//     if(req.session.userID) {
//         res.redirect('/quote');
//     } else {
//         res.redirect('/login');
//     }
// });

// router.post('/logout', (req, res) => {
//     req.session.destroy((error) => {
//         if (err) throw err;
//         res.redirect('/login');
//     });
// });

module.exports = router;
