module.exports = require('knex')({
  client: 'mysql2',
  connection: {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'baphu123',
    database: 'my_database'
  }
})
