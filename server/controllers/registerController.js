const express = require('express');
const mysql = require('mysql');
const router = express.Router();

let registers = [
    {
        "username": "kyle",
        "password": "123d45g67y8",
        "confirmPassword": "123d45g67y8"
    }
];

const db = mysql.createConnection
    ({
        host: 'sql9.freemysqlhosting.net',
        user: 'sql9598279',
        password: '55U3QzBa79',
        database: 'sql9598279'
    });

db.connect((err) => {
    if (err) throw err;
    else{console.log('Connected to MySQL Server!');}

    db.query("SELECT customer_state FROM sql9598279.customer_accounts;", function (err, result, fields)
    {
        if (err) throw err;
        //else{console.log(result);}
    });
});

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
    const query = `INSERT INTO credentials(username,password) VALUES('${req.body.username}', '${req.body.password}')`
    db.query(query,function(err,result,fields){
        if(err) throw err;
    })
    registers.push(register);
    res.send(register);
});

module.exports = router;