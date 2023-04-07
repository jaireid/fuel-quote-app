const express = require('express');
const router = express.Router();

let logins = [
    {
        "username": "kyle",
        "password": "123d45g67y8"
    }
];

router.get('/', (req, res) => {
    res.json(login);
});

router.post('/', (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).send('Missing required fields');
        return;
    }

    const login = {
        id: logins.length = 1,
        username: req.body.username,
        password: req.body.password
    };

    logins.push(login);
    res.send(login);
});

module.exports = router;