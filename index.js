const inquirer = require('inquirer'); //using inquirer for question on the command line 
const fs = require('fs'); //Might not need this afterall
const cTable = require('console.table'); //using console.table package 
const mysql = require('mysql2'); // using mysql2 package


  const start = [
    {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: ['View all employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments, Add Department']
    },
]
    inquirer.prompt(start).then((answers) => {  
      console.log(answers.action);
      let userChoice = answers.action;
      //swith (if statements)
      if (userChoice === 'View all employees') {
        
      }
       (answers), (err) => 
            err ? console.log(err) : console.log('Success') 
        
    });




  // Query database
// db.query('SELECT * FROM favorite_books', function (err, results) {
//     console.log(results);
//   });