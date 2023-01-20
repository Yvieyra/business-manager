const inquirer = require('inquirer');
const fs = require('fs');
const cTable = require('console.table');

// Import and require mysql2
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password
      password: 'Felizfamily2017!',
      database: '______'
    },
    console.log(`Connected to the ___________.`)
  );






  // Query database
db.query('SELECT * FROM favorite_books', function (err, results) {
    console.log(results);
  });