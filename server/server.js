require('dotenv').config();
const express = require('express');
// const db = require('./config/db');
const cors = require('cors');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const helmet = require('helmet');
const cookieParser = require("cookie-parser");
const csurf = require("tiny-csrf");
const rateLimit = require('express-rate-limit');
const mysql = require('mysql');
const quotesController = require('./controllers/quotesController');
const protectedController = require('./controllers/protectedController');
const loginController = require('./controllers/loginController');
const profileController = require('./controllers/profileController');
const registerController = require('./controllers/registerController');

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
    //else{console.log('Connected to MySQL Server!');}

    db.query("SELECT username FROM sql9598279.credentials;", function (err, result, fields)
    {
        if (err) throw err;
    });

});

const sessionStore = new MySQLStore({
    expiration: 86400000,
    createDatabaseTable: true,
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
}, db);

// app.use(express.urlencoded({ extended: false }));
app.use(express.json());
var corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
  };
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
// app.use(cors());

// app.use(cookieParser("cookie-parser-secret"));

app.use(session({
    key: 'session_cookie_name',
    secret: 'gsyugyusad6567fvfdsagy3653258325',
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 3600000
    }
}));

sessionStore.onReady().then(() => {
	// MySQL session store ready for use.
	console.log('MySQLStore ready');
}).catch(error => {
	// Something went wrong.
	console.error(error);
});

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });

// app.use(helmet())

// app.use(
//     csurf(
//         "123456789iamasecret987654321look",
//         ["GET", "POST"]
//     )
// );

// app.use(rateLimit({
//     windowMs: 60 * 1000,
//     max: 10, // limit each IP to 10 requests per minute
// }));  

app.use('/protected', protectedController);
app.use('/quotes', quotesController);
app.use('/login', loginController);
app.use('/register', registerController);
app.use('/profile', profileController);

// Error Handler
app.use((err, req, res, next) => {
    console.log(err.stack);
    console.log(err.name);
    console.log(err.code);
});

// Listen
app.listen(port, () => console.log(`Server started on port ${port}`));

module.exports = app;
