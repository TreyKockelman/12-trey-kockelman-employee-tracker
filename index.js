const { prompt } = require("inquirer");
const logo = require("asciiart-logo");

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
        },
        {
          name: "Exit",
          value: "EXIT"
        },
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
      case "UPDATE_EMPLOYEE_ROLE":
        updateEmployee();
        break;
      case "EXIT":
        db.close();
        return;
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

async function addRole() {
  let temp = await db.findAllDepartments();
  let depts = [];
  for ( const {id, name} of temp[0]) {
    depts.push( {name : name, value : id})
  }

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
      choices: [...depts],
      name: 'role_depID',
    },
  ]).then(res => {
    db.addRole(res.role_name, res.role_salary, res.role_depID).then(() => loadMainPrompts());
  })
};

async function addEmployee() {
  let tempRoles = await db.findAllRoles();
  let roles = [];
  for ( const {id, title} of tempRoles[0]) {
    roles.push( {name : title, value : id})
  }

  let tempManager = await db.getManagers();
  let managers = [];
  for ( const {name, value} of tempManager[0]) {
    managers.push( {name : name, value : value})
  }
  managers.push( {name: "None", value: null})

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
      choices: [...roles],
      name: 'role',
    },
    {
      type: 'list',
      message: "Enter Employee Manager",
      choices: [...managers],
      name: 'manager',
    },
  ]).then(res => {
    db.addEmployee(res.first_name, res.last_name, res.role, res.manager).then(() => loadMainPrompts());
  })
}

async function updateEmployee() {
  let tempRoles = await db.findAllRoles();
  let roles = [];
  for ( const {id, title} of tempRoles[0]) {
    roles.push( {name : title, value : id})
  }

  let tempEmployee = await db.getEmployees();
  let employees = [];
  for ( const {value, name} of tempEmployee[0]) {
    employees.push( {name : name, value : value})
  }

  prompt([
    {
      type: 'list',
      message: "Choose Employee to Update",
      choices: [...employees],
      name: 'employee'
    },
    {
      type: 'list',
      message: "Updated Role",
      choices: [...roles],
      name: 'role',
    },
  ]).then(res => {
    db.updateEmployee(res.employee, res.role).then(() => loadMainPrompts());
  })
}


/* ======= END Controllers ============================================================ */

init();