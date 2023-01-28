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
      "Add role",
      "View all departments",
      "Add department",
    ],
  },
];
function promptUser() {
  inquirer.prompt(question).then((answers) => {
    console.log(answers.action);
    let userChoice = answers.action;

    if (userChoice === "View all departments") {
      viewDepartments();
    }

    if (userChoice === "Add department") {
      addDepartment();
    }

    if (userChoice === "View all roles") {
      viewRoles();
    }

    if (userChoice === "Add role") {
      addRole(); //not functioning right now 
    }
    
    if (userChoice === "View all employees") {
      viewEmployees();
    }
    answers, (err) => (err ? console.log(err) : console.log("Success"));
  });
}

promptUser();

const viewDepartments = () => {
  db.query("SELECT * FROM department", function (err, results) {
    console.table(results);
    promptUser();
  });
};

const viewRoles = () => {
  db.query(
    "SELECT * FROM roles JOIN department ON roles.department_id = department.id",
    function (err, results) {
      //need to correct what is being selected and joined
      console.table(results);
      promptUser();
    }
  );
};

const addDepartment = () => {
  newDepartment = [
    {
      type: "input",
      name: "dept",
      message: "What is the name of the department?",
    },
  ];
  inquirer.prompt(newDepartment).then((answers) => {
    console.log(answers.dept);
    const sql = `INSERT INTO department (department_name) VALUES (?)`;
    const params = [answers.dept];

    db.query(sql, params, (err, result) => {
      if (err) {
        console.log("ERROR");
      } else {
        console.log("Succesffuly added to Departments!");
      }
      answers, (err) => (err ? console.log(err) : console.log("Success"));
      promptUser();
    });
  });
};

const addRole = () => {
  newRole = [
    {
      type: "input",
      name: "role",
      message: "What is the new role?",
    },
    {
      type: "input",
      name: "salary",
      message: "What is the salary?",
    },
    {
      type: "list",
      name: "department",
      message: "What department does this role belong to?",
      choices: [
        "Sales",
        "Engineering",
        "Finance",
        "Legal",
      ],
    },
  ];
  inquirer.prompt(newRole).then((answers) => {
    console.log(answers.role);
    console.log(answers.salary);
    console.log(answers.department);
    const sql = `INSERT INTO role (title, salary, department.department_name) VALUES (?, ?, ?)`;
    const params = [answers.role, answers.salary, answers.department];

    db.query(sql, params, (err, result) => {
      if (err) {
        console.log("ERROR");
      } else {

        console.table(result);
      }
      answers, (err) => (err ? console.log(err) : console.log("Success"));
      promptUser();
    });
  });
};

const viewEmployees = () => { //need to filter out results, have what it needed plus some duplicated Id's
  db.query("SELECT * FROM employee JOIN roles ON employee.role_id = roles.id JOIN department ON roles.department_id = department.id;", function (err, results) {
    console.table(results);
    promptUser();
  });
};


