const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
require("console.table");

// This file leads to a class we've created to contain all our database queries
const db = require("./db");


// Use this function to display the ascii art logo and to begin the main prompts
function init() {

  loadMainPrompts()
}



// Here we load the initial prompts with a series of options. The first option is provided for you.
function loadMainPrompts() {
  prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "View All Departments",
          value: "VIEW_DEPARTMENTS"
        },
        {
          name: "View All Roles",
          value: "VIEW_ROLES"
        },
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES"
        },
        {
          name: "Add a Department",
          value: "ADD_DEPARTMENT"
        },
        {
          name: "Add a Role",
          value: "ADD_ROLE"
        },
        {
          name: "Add an Employee",
          value: "ADD_EMPLOYEE"
        },
        {
          name: "Update Employee Role",
          value: "UPDATE_EMPLOYEE_ROLE"
        }
      ]
    }
  ]).then(res => {
    let choice = res.choice;
    // Call the appropriate function depending on what the user chose
    
    switch (choice) {
      case "VIEW_DEPARTMENTS":
        viewDepartments();
        break;
      case "VIEW_ROLES":
        viewRoles();
        break;
      case "VIEW_EMPLOYEES":
        viewEmployees();
        break;
      case "ADD_DEPARTMENT":
        addDepartment();
        break;
      case "ADD_ROLE":
        addRole();
        break;
      case "ADD_EMPLOYEE":
        addEmployee();
        break;
    }
  }
)}




/* ======= Controllers ========= */

function viewDepartments() {
  db.findAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      console.log("\n");
      console.table(departments);
  })
  .then(() => loadMainPrompts());
};

function viewRoles() {
  db.findAllRoles() 
    .then(([rows]) => {
      let role = rows;
      console.log("\n");
      console.table(role);
    })
  .then(() => loadMainPrompts());
}

function viewEmployees() {
  db.findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.log("\n");
      console.table(employees);
    })
    .then(() => loadMainPrompts());
}

function addDepartment() {
  prompt(
    {
      type: 'input',
      message: "Enter Department Name",
      name: 'dep_name',
    },
  ).then(res => {
    db.addDepartment(res.dep_name).then(() => loadMainPrompts());
  })
};

function addRole() {
  prompt([
    {
      type: 'input',
      message: "Enter Role Name",
      name: 'role_name',
    },
    {
      type: 'input',
      message: "Enter Role Salary",
      name: 'role_salary',
    },
    {
      type: 'list',
      message: "Enter Role Department ID",
      choices: [{name: "Sales", value: 1}, {name: "Engineering", value: 2}, {name: "Finance", value: 3}, {name: "Legal", value: 4}],
      name: 'role_depID',
    },
  ]).then(res => {
    db.addRole(res.role_name, res.role_salary, res.role_depID).then(() => loadMainPrompts());
  })
};

function addEmployee() {
  prompt([
    {
      type: 'input',
      message: "Enter Employee First Name",
      name: 'first_name',
    },
    {
      type: 'input',
      message: "Enter Employee Last Name",
      name: 'last_name',
    },
    {
      type: 'list',
      message: "Enter Employee Role",
      choices: [{name: "Sales Lead", value: 1}, {name: "Salesperson", value: 2}, {name: "Lead Engineer", value: 3}, {name: "Software Engineer", value: 4}, {name: "Account Manager", value: 5}, {name: "Accountant", value: 6}, {name: "Legal Team Lead", value: 7}, {name: "Lawyer", value: 8}],
      name: 'role',
    },
    {
      type: 'list',
      message: "Enter Employee Manager",
      choices: [{name: "John Doe", value: 1}, {name: "Ashley Rodriguez", value: 3}, {name: "Malia Brown", value: 5}, {name: "Sarah Lourd", value: 7}],
      name: 'manager',
    },
  ]).then(res => {
    db.addEmployee(res.first_name, res.last_name, res.role, res.manager).then(() => loadMainPrompts());
  })
}


/* ======= END Controllers ============================================================ */





/* 
  You will write lots of other functions here for the other prompt options.
  Note that some prompts will require you to provide more prompts, and these 
  may need functions of their own.
*/



// Everything starts here!
init();