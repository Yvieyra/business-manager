const inquirer = require("inquirer"); //using inquirer for question on the command line
const cTable = require("console.table"); //using console.table package to display table results 
const mysql = require("mysql2"); // using mysql2 package

const db = mysql.createConnection({
  host: "localhost",
  // MySQL username
  user: "root",
  //MySQL password security 
  password: process.env.MYSQL_PASSWORD,
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
      "Add employee",
      "Update employee role",
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
      addRole(); 
    }

    if (userChoice === "View all employees") {
      viewEmployees();
    }

    if (userChoice === "Add employee") {
      addEmployee();
    }

    if (userChoice === "Update employee role") {
      updateEmployee();
    }
    answers, (err) => (err ? console.log(err) : console.log("Success"));
  });
}

promptUser();

const viewDepartments = () => {
  db.query("SELECT * FROM department", function (err, results) {
    console.table(results); //table displays all departments 
    promptUser();
  });
};
 
const viewRoles = () => {
  db.query(
    "SELECT * FROM roles JOIN department ON roles.department_id = department.id",
    function (err, results) {
      //could eliminate department ID
      console.table(results); //displays all roles, with department ID numbers
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
        console.log("Succesffuly added to Departments!"); //view all departments to confirm change 
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
      type: "number",
      name: "salary",
      message: "What is the salary?",
    },
    {
      type: "list",
      name: "department",
      message:
        "What department does this role belong to? (sales-1) (Engineering-2) (Finance-3) (Legal-4)",
      choices: ["1", "2", "3", "4"],
    },
  ];
  inquirer.prompt(newRole).then((answers) => {
    const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
    const params = [answers.role, answers.salary, answers.department];

    db.query(sql, params, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Succesffuly added new role!"); //view all roles to confirm change 
      }
      answers, (err) => (err ? console.log(err) : console.log("Success"));
      promptUser();
    });
  });
};

const viewEmployees = () => {
  //need to filter out results, have what it needed plus some duplicated Id's
  db.query(
    "SELECT * FROM employee JOIN roles ON employee.role_id = roles.id JOIN department ON roles.department_id = department.id;",
    function (err, results) {
      console.table(results); //table displays all employees 
      promptUser();
    }
  );
};


const addEmployee = () => {
  newEmployee = [
    {
      type: "input",
      name: "name",
      message: "What is the employee's first name?",
    },
    {
      type: "input",
      name: "lastName",
      message: "What is the employee's last name?",
    },
    {
      type: "list",
      name: "roleId",
      message:
        "What is this new employee's role? (Sales Lead-1) (Salesperson-2) (Lead Engineer-3) (Software Engineer-4) (Account Manager-5) (Accountant-6) (Legal Team Lead-7) (Lawyer-8)",
      choices: ["1", "2", "3", "4", "5", "6", "7", "8"],
    },
    {
      type: "list",
      name: "managerId",
      message: "What manager ID does this employee have?",
      choices: ["5050", "6060", "7070", "8080", "9090"],
    },
  ];
  inquirer.prompt(newEmployee).then((answers) => {
    const sql =
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
    const params = [
      answers.name,
      answers.lastName,
      answers.roleId,
      answers.managerId,
    ];

    db.query(sql, params, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Succesffully added a new employee!"); //view all employees to confirm change 
      }
      answers, (err) => (err ? console.log(err) : console.log("Success"));
      promptUser();
    });
  });
};

const updateEmployee = () => {
  updatedRole = [
    {
      type: "list",
      name: "employee",
      message: "Which employee ID are you updating a role for? Refer to employee table",
      choices: ["1", "2", "3", "4", "5", "6", "7", "8"],
    },
    {
      type: "list",
      name: "newRole",
      message:   "What is this employee's new role? (Sales Lead-1) (Salesperson-2) (Lead Engineer-3) (Software Engineer-4) (Account Manager-5) (Accountant-6) (Legal Team Lead-7) (Lawyer-8)",
      choices: ["1", "2", "3", "4", "5", "6", "7", "8"],
    },
  ];
  inquirer.prompt(updatedRole).then((answers) => {
    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
    const params = [answers.newRole, answers.employee]; //answers have been swapped from the order the quetions are asked to first find the employee we are updating the role for.

    db.query(sql, params, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Succesffuly updated employee role!"); //view all roles to confirm change 
        console.log(result);
      }
      answers, (err) => (err ? console.log(err) : console.log("Success"));
      promptUser();
    });
  });
};