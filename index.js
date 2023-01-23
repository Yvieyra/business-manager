const inquirer = require("inquirer"); //using inquirer for question on the command line
const fs = require("fs"); //Might not need this afterall
const cTable = require("console.table"); //using console.table package
const mysql = require("mysql2"); // using mysql2 package

const db = mysql.createConnection({
  host: "localhost",
  // MySQL username,
  user: "root",
  // TODO: Add MySQL password
  password: "Felizfamily2017!",
  database: "business_db",
});


//start of the program
const question = [
  {
    type: "list",
    name: "action",
    message: "What would you like to do?",
    choices: [
      "View all employees",
      "Add Employee",
      "Update Employee Role",
      "View all roles",
      "Add Role",
      "View all departments",
      "Add department",
    ],
  },
];
function promptUser() {
inquirer.prompt(question).then((answers) => {
  console.log(answers.action);
  let userChoice = answers.action;
  //swith (if statements)
  if (userChoice === "View all departments") {
    viewDepartments();
  }

  if (userChoice === "Add department") {
    addDepartment();
  }

  if (userChoice === 'View all roles') {
    viewRoles();
  }
  (answers), (err) => 
  err ? console.log(err) : console.log("Success");
});
};

promptUser();

const viewDepartments = () => {
  db.query("SELECT * FROM department", function (err, results) {
    console.table(results);
    promptUser();
  });
};

const viewRoles = () => {
  db.query("SELECT * FROM roles", function (err, results) {
    console.table(results);
    promptUser();
  });
};


// Function to add a new department
const addDepartment = () => {
          newDepartment = [{
            type: 'input',
            name: 'dept',
            message: 'What is the name of the department?',
          }]
        
        inquirer.prompt(newDepartment).then((answers) => {
          console.log(answers.dept);
          db.query('INSERT INTO department (department_name) VALUES(?)', ('department_name'), function (err, results) {
            console.table(results);
        });
          (answers), (err) => 
            err ? console.log(err) : console.log('Success') 
            promptUser();
        });
      };