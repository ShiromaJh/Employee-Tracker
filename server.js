const inquirer = require("inquirer");
const db = require("./db/connection");

function viewAllDepartments() {
  const sql = "SELECT * from department";
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
  });
  prompt();
}

function viewAllRoles() {
  const sql = `SELECT role.id, role.title, role.salary, department.name 
              FROM role 
              LEFT JOIN department
              ON department.id = role.id`;

  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
  });
  prompt();
}

function viewAllEmployees() {
  const sql = `SELECT employee.*, role.title, role.salary, department.name FROM employee
                LEFT JOIN role
                ON role.id = employee.role_id
                LEFT JOIN department
                ON role.department_id = department.id`;

  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    prompt();
  });
}

function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      name: "name",
      message: "Input name of department:",
      validate: (name) => {
        if (name) {
          return true;
        } else {
          console.log("Enter department name");
          return false;
        }
      },
    })
    .then((newDepartment) => {
      const sql = `INSERT INTO department (name) VALUES (?)`;
      const params = newDepartment.name;
      db.query(sql, params, (err, rows) => {
        if (err) throw err;
        console.log("New department successfully added");
        prompt();
      });
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Input the position you would like to add: ",
        validate: (title) => {
          if (title) {
            return true;
          } else {
            console.log("Please enter position name");
          }
        },
      },
      {
        type: "input",
        name: "salary",
        message: "Input the salary of position: ",
        validate: (salary) => {
          if (salary) {
            return true;
          } else {
            console.log("Please enter position salary");
          }
        },
      },
      {
        type: "input",
        name: "department",
        message: "Input the department of position: ",
        validate: (department) => {
          if (department) {
            return true;
          } else {
            console.log("Please enter id of department");
          }
        },
      },
    ])
    .then((newRole) => {
      const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
      const params = [newRole.title, newRole.salary, newRole.department];

      db.query(sql, params, (err, rows) => {
        if (err) throw err;
        console.log("new role added");
        prompt();
      });
    });
}

function prompt() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "userInput",
        pageSize: 8,
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee's role",
          "Quit application",
        ],
      },
    ])
    .then((response) => {
      switch (response.userInput) {
        case "View all departments":
          viewAllDepartments();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "View all employees":
          viewAllEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          //function
          break;
        case "Update an employee's role":
          //function
          break;
        case "Quit application":
          process.exit();
          break;
        default:
          console.log("error");
      }
    });
}
prompt();