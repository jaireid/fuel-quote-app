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
    else{console.log('Connected to MySQL Server!');}

    db.query("SELECT customer_state FROM sql9598279.customer_accounts;", function (err, result, fields)
    {
        if (err) throw err;
        //else{console.log(result);}
    });
});

app.use(express.json());
app.use(cors());

app.get('/login', (req, res) => {
    console.log('login attempted');
    const {username, password} = req.query;

    const query = `SELECT * FROM sql9598279.customer_accounts WHERE customer_username ='${username}' AND customer_password='${password}'`;

    db.query(query, (error, result) => {
        if(error) throw error;
        if(result.length === 1){
            console.log('Login successful');
            res.send('Login successful');
        }else {
            console.log('Incorrect username or password');
            res.send('Invalid username or password');
        }
        });
    });

app.get('/register', (req, res) => {
    const {username, password} = req.query;
    const query = `INSERT INTO sql9598279.customer_accounts(customer_username, customer_password) VALUES('${username}', '${password}')`;

    db.query(query, (error, result) => {
        if(error) throw error;
        if(results.length >= 1){
            res.send('Registration Successful');
        }else {
            res.send('Invalid account information');
        }
        });
    });


app.get('/profile', (req, res) => {
    const {name, address1, address2, city, region, zipcode} = req.query;
    const query = `INSERT INTO sql9598279.customer_accounts(customer_name, customer_address1, customer_address2, customer_city, customer_state, customer_zipcode) VALUES('${name}', '${address1}', '${address2}', '${city}', '${region}', '${zipcode}')`;

    db.query(query, (error, result) => {
        if(error) throw error;
        if(results.length >= 1){
            res.send('Profile updated');
        }else {
            res.send('Invalid profile information');
        }
        });
    });
    
// Routes
app.get('/', (req, res) => {
    res.send('Testing');
});
  
app.use('/quotes', quotesController);
app.use('/login', loginController.js);
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
