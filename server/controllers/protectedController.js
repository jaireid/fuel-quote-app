const express = require('express');
const db = require('../config/db');
const router = express.Router();
const mysql = require('mysql');

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
