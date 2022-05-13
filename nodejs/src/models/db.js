const mysql = require("mysql");

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'baphu123',
  database: 'my_database'
});
// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("MySQL Connected!!!");
});

module.exports = connection;