require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const quotesController = require('./controllers/quotesController');
const app = express();
const port = process.env.PORT;


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

app.use(express.json());
app.use(cors());

app.get('/login', (req, res) => {
    const {username, password} = req.query;
    const query = `SELECT * FROM sql9598279.customer_accounts WHERE customer_username ='${username}' AND customer_password='${password}'`;

    db.query(query, (error, result) => {
        if(error) throw error;
        if(results.length >= 1){
            res.send('Login successful');
        }else {
            res.send('Invalid username or password');
        }
        });
    });


// Routes
app.get('/', (req, res) => {
    res.send('Testing');
});
  
app.use('/quotes', quotesController);
// app.use('/users', usersController);

// Error Handler
app.use((err, req, res, next) => {
    console.log(err.stack);
    console.log(err.name);
    console.log(err.code);

    res.status.json({
        message: 'Something went wrong',
    });
});

// Listen
app.listen(port, () => console.log(`Server started on port ${port}`));

module.exports = app;