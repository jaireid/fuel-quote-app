const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

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
    db.query("SELECT customer_state FROM sql9598279.customer_accounts;", function (err, result, fields)
    {
        if (err) throw err;
        console.log(result);
    });
});

const app = express();
app.use(express.json());
app.use(cors());

app.listen(3001, () => console.log('Server started on port 3001'));