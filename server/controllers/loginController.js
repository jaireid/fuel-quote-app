const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json(login);
});

router.get('/fill', (req, res) => {
    const data = fill;

    if (!data) return res.status(404).send('Fill info not found');

    res.json(data);
});

router.post('/', (req, res) => {


    login.push(login);
    
});