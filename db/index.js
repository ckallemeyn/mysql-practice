const mysql = require('mysql');
const password = require('../config.js').password

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: password,
  database: 'dogs'
});

module.exports = db;