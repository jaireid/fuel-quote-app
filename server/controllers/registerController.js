const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
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
    console.log('Connected to MySQL Server!');
});

const saltRounds = 10;

router.post('/', (req, res) => {
    if (!req.body.username || !req.body.password || !req.body.confirmPassword) {
        res.status(400).send('Missing required fields');
        return;
    }

    const username = req.body.username;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    if (password !== confirmPassword) {
        res.status(400).send('Passwords do not match');
        return;
    }

    db.query(`SELECT username FROM sql9598279.credentials WHERE username='${username}';`, function (err, result, fields)
    {
        // check if username exists
        if (result.length > 0) {
            res.status(400).send('Username already taken');
            return;
        }

        bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
            if(err) {
                res.status(400).send('Hash error');
                return;
            }
    
            const query = `INSERT INTO credentials(username,password) VALUES('${username}', '${hashedPassword}')`;
            db.query(query, function(err, result, fields) {
                if (err) throw err;

                res.redirect('/login');
            });
        })
    });
});

module.exports = router;