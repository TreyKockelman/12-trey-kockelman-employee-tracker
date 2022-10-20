DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;

USE employees;

CREATE TABLE department (
  -- insert the id and name columns here --
);

CREATE TABLE role (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  -- insert the title and salary columns here --
  
  department_id INT UNSIGNED NOT NULL,
  INDEX dep_ind (department_id),
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT UNSIGNED NOT NULL,
  INDEX role_ind (role_id),

  -- using the role table above as a guide, create a constraint named fk_role on the foreign key of role_id, which --
  -- references the id column of the role table, and performs a cascade delete when needed --

  -- constraint goes here --
  manager_id INT UNSIGNED,
  INDEX man_ind (manager_id),

  -- using the role table above as a guide, create a constraint named fk_manager on the foreign key of manager_id, which 
  -- references the id column of the employee table, and just sets NULL on a delete action
  
  -- constraint goes here
);