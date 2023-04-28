const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const path = require('path');
// const db = require('../config/db');
const saltRounds = 10;

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

// // Serve static files from the client folder
// router.use(express.static(path.join(__dirname, 'client')));

// // Route to the login page
// router.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', '..', 'client', 'src', 'components', 'Login.jsx'));
// });

router.get('/', (req, res) => {
    res.redirect('/login');
});

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
            // const user = result[0];

            bcrypt.compare(password, hashedPassword, function (err, bcryptResult) {
                if (err) throw err;
                // console.log("failing hash");
                // console.log(bcryptResult);
                if (bcryptResult) {
                    // Login is valid
                    console.log("Login is valid");
                    console.log(result[0].username);
                    // req.session.userId = result[0].username;
                    // if(!req.session.userId){
                    //     req.session.userId = result[0].username;
                    //     res.redirect('/quote');
                    // } else {
                    //     res.redirect('/quote');
                    // }
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