const express = require('express');
const db = require('../config/db');
const mysql = require('mysql');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;


let registers = [
    {
        "username": "kyle",
        "password": "123d45g67y8",
        "confirmPassword": "123d45g67y8"
    }
];

router.get('/', (req, res) => {
    res.json(registers);
});


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

    bcrypt.hash(password, saltRounds, function(err, hash) {
        if (err) throw err;
        db.query(`SELECT username FROM sql9598279.credentials WHERE username='${username}';`, function (err, result, fields)
            {
            if (err) throw err;
            //else{console.log(result);}
            if(result.length>0)
            {
                res.status(400).send("Username already taken");
                return;
            }
        });
        const query = `INSERT INTO credentials(username,password) VALUES('${username}', '${hash}')`;
        db.query(query, function(err, result, fields) {
            if (err) throw err;

            const register = {
                id: result.insertId,
                username: username,
                password: hash
            };

            registers.push(register);
            res.redirect('/login');
            res.status(200);
        });
    });
});


module.exports = router;