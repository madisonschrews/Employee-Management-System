const mysql = require('mysql');
const inquirer = require('inquirer');

const db = mysql.createConnection({
  host: 'localhost',
  port: 3000,
  user: 'root',
  password: '',
  database: 'employee_db'
});

let promptInitial = () => {
  inquirer.prompt(
    {
      type: 'list',
      name: 'response',
      message: 'What would you like to do?',
      choices: [
        'View All Employees',
        'View All Employees By Department',
        'Add Employee',
        'Update Employee Role',
        'View All Roles',
        'Add Role',
        'View All Deparments',
        'Add Department'
      ]
    }).then((answer) => {
      switch (answer) {
        case (answer.response == 'View All Employees'):
          viewEmployees();
        case (answer.response == 'View All Employees By Department'):
          viewEmployeesDepartment();
        /*case (answer.response == 'View All Employees By Manager'):
          viewEmployeesManager();*/
        case (answer.response == 'Add Employee'):
          addEmployee();
        /*case (answer.response == 'Remove Employee'):
          removeEmployee();*/
        case (answer.response == 'Update Employee Role'):
          updateEmployeeRole();
        /*case (answer.response == 'Update Employee Manager'):
          updateEmployeeManager();*/
        case (answer.response == 'View All Roles'):
          viewRoles();
        case (answer.response == 'Add Role'):
          addRole();
        /*case (answer.response == 'Remove Role'):
          removeRole();*/
        case (answer.response == 'View All Departments'):
          viewDepartments();
        case (answer.response == 'Add Department'):
          addDepartment();
        /*case (answer.response == 'Remove Department'):
          removeDepartment();*/
        /*case (answer.response == 'View Department Budget'):
          viewBudgetDpartment();*/
      }
    }
  );
}

promptInitial();

let viewEmployees = () => {
  let queryString = 'SELECT employee.id AS id, employee.first_name AS first_name, employee.last_name AS last_name,roles.title AS title, roles.salary AS salary, department.name AS department, CONCAT(e.first_name, " ", e.last_name) AS Manager FROM employee JOIN roles ON employee.role_id = roles.id JOIN department ON roles.dept_id=department.id LEFT JOIN employee e ON employee.manager_id=e.id';
  db.query(queryString, (err, rows, fields) => {
    if (err) {
      throw err;
    }
    console.clear();
    console.table(rows);

    promptInitial();
  });
}

let viewEmployeesDepartment = () => {
  let queryString = 'SELECT employee.id AS id, employee.first_name AS first_name, employee.last_name AS last_name,roles.title AS title, roles.salary AS salary, department.name AS department,CONCAT(e.first_name, " ", e.last_name) AS Manager FROM employee JOIN roles ON employee.role_id = roles.id JOIN department ON roles.dept_id=department.id LEFT JOIN employee e ON employee.manager_id=e.id WHERE employee.manager_id IS NOT NULL';
  db.query(queryString, (err, rows, fields) => {
    if (err) {
      throw err;
    }
    console.clear();
    console.table(rows);

    promptInitial();
  });
}


let addEmployee = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'What is the employee\'s first name?'
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'What is the employee\'s last name?'
    },
    {
      type: 'list',
      name: 'role',
      message: 'What is the employee role?',
      choices: []
    },
    {
      type: 'list',
      name: 'department',
      message: 'What is the employee department?',
      choices: []
    },
    {
      type: 'list',
      name: 'manager',
      message: 'Who is the employee manager?',
      choices: []
    }
  ]).then((answer) => {
    let roleId;
    let departmentId;
    let managerId;

    db.query('INSERT INTO employee SET ?',
      {
        first_name: answer.first_name,
        last_name: answer.last_name,
        role_id: roleId,
        manager_id: managerId
      }, (err, res) => {
        if (err) {
          throw err;
        }
      }
    );

    db.query('INSERT INTO role SET ?',
      {
        role: answer.role,
        salary: answer.salary,
        department_Id: departmentId
      }, (err, res) => {
        if (err) {
          throw err;
        }
      }
    );

  });
}

let removeEmployee = () => {

}

let updateEmployeeRole = () => {
  db.query(

  )
}


let viewRoles = () => {

}

let addRole = () => {

}

let removeRole = () => {

}


let viewDepartments = () => {

}

let addDepartment = () => {

}

let removeDepartment = () => {

}