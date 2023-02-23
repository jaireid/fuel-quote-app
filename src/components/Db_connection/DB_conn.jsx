mysql = require('mysql');
const connection = mysql.createConnection
    ({
        host: 'sql9.freemysqlhosting.net',
        user: 'sql9598279',
        password: '55U3QzBa79',
        database: 'sql9598279'
    });

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Server!');
    connection.query("SELECT customer_state FROM sql9598279.customer_accounts;", function (err, result, fields)
    {
        if (err) throw err;
        console.log(result);
    });
});

