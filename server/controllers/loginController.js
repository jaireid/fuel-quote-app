const express = require('express');
const db = require('../config/db');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// let logins = [
//     {
//         "username": "kyle",
//         "password": "123d45g67y8"
//     }
// ];

// router.get('/', (req, res) => {
//     res.json(login);
// });

router.post('/', (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).send('Missing required fields');
        return;
    }

    const username = req.body.username;
    const password = req.body.password;

    db.query(`SELECT * FROM sql9598279.credentials WHERE username = '${username}'`, function (err, result, fields) {
        if (err) throw err;

        if (result.length > 0) {
            const hashedPassword = result[0].password;
            bcrypt.compare(password, hashedPassword, function (err, bcryptResult) {
                if (err) throw err;
                console.log(bcryptResult);
                if (bcryptResult) {
                    // Login is valid
                    console.log("Login is valid");
                    console.log(result[0].username);
                    req.session.userID = user.id;
                    res.send("Login successful");
                    res.redirect('/profile');
                } else {
                    // Login is not valid
                    //console.log("Password is wrong");
                    res.status(401).send('Invalid login credentials');
                }
            });
        } else {
            // Login is not valid
            //console.log("username is wrong");
            res.status(401).send('Invalid login credentials');
        }
    });
});

module.exports = router;