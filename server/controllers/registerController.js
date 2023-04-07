const express = require('express');
const router = express.Router();

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

    const register = {
      id: registers.length + 1,
      username: req.body.username,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword
    };

    registers.push(register);
    res.send(register);
});

module.exports = router;