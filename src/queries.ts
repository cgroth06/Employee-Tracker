import { createClient } from './connection.js';

// View departments
// View all departments
export const getAllDepartments = async () => {
    const client = createClient();
    await client.connect();
    try {
        const res = await client.query('SELECT * FROM department');
        console.log('Departments fetched:', res.rows); // Debug log
        return res.rows; // Ensure this returns the rows
    } catch (error) {
        console.error('Error fetching departments:', error); // Log any errors
    } finally {
        await client.end(); // Ensure client is always closed
    }
};


// Add department
export const addDepartment = async (name: string) => {
    const client = createClient();
    await client.connect();
    try {
        
        const existingDept = await client.query('SELECT * FROM department WHERE name = $1', [name]);
        if (existingDept.rows.length > 0) {
            console.log(`Department "${name}" already exists.`);
            return;
        }
        
        await client.query('INSERT INTO department (name) VALUES ($1)', [name]);
        console.log(`Department "${name}" added successfully.`);
    } catch (error) {
        console.error('Error adding department:', error);
    } finally {
        await client.end();
    }
};

// View all roles
export const getAllRoles = async () => {
  const client = createClient();
  await client.connect();
  const res = await client.query(
    `SELECT role.id, role.title, role.salary, department.name AS department 
     FROM role 
     LEFT JOIN department ON role.department_id = department.id`
  );
  await client.end();
  return res.rows;
};

// Add role
export const addRole = async (title: string, salary: number, departmentId: number) => {
  const client = createClient();
  await client.connect();
  await client.query(
    'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)',
    [title, salary, departmentId]
  );
  await client.end();
};

// View all employees
export const getAllEmployees = async () => {
  const client = createClient();
  await client.connect();
  const res = await client.query(
    `SELECT employee.id, employee.first_name, employee.last_name, role.title AS job_title, 
     department.name AS department, role.salary, manager.first_name AS manager 
     FROM employee 
     LEFT JOIN role ON employee.role_id = role.id 
     LEFT JOIN department ON role.department_id = department.id 
     LEFT JOIN employee manager ON employee.manager_id = manager.id`
  );
  await client.end();
  return res.rows;
};

// Add employee
export const addEmployee = async (firstName: string, lastName: string, roleId: number, managerId: number | null) => {
  const client = createClient();
  await client.connect();
  await client.query(
    'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
    [firstName, lastName, roleId, managerId]
  );
  await client.end();
};

// Update role
export const updateEmployeeRole = async (employeeId: number, newRoleId: number) => {
  const client = createClient();
  await client.connect();
  await client.query(
    'UPDATE employee SET role_id = $1 WHERE id = $2',
    [newRoleId, employeeId]
  );
  await client.end();
};
