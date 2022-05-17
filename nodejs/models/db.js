const mysql = require('mysql2');
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'baphu123',
    database: 'my_database'
  }
})

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'baphu123',
  database: 'my_database'
});

module.exports = pool.promise();
