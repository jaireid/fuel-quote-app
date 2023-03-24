require('dotenv').config();
const express = require('express');
const cors = require('cors');
const quotesController = require('./controllers/quotesController');
// const usersController = require('./controllers/usersController');

const app = express();
const port = process.env.PORT;

// Middlesware
app.use(express.json());
app.use(cors());

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