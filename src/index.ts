import inquirer from 'inquirer';
//import all queries from queries.ts
import { getAllDepartments, addDepartment, getAllRoles, addRole, getAllEmployees, addEmployee, updateEmployeeRole } from './queries.js';

console.log('Welcome to the Employee Tracker!');

async function menu() {
    const { menuOptions } = await inquirer.prompt([
        {
            type: 'list',
            name: 'menuOptions',
            message: 'What would you like to do?',
            choices: [
                {
                    name: 'View All Departments',
                    value: 'get_departments'
                },
                {
                    name: 'View All Roles',
                    value: 'view_roles'
                },
                {
                    name: 'View All Employees',
                    value: 'view_employees'
                },
                {
                    name: 'Add a Department',
                    value: 'add_department'
                },
                {
                    name: 'Add a Role',
                    value: 'add_role'
                },
                {
                    name: 'Add an Employee',
                    value: 'add_employee'
                },
                {
                    name: 'Update an Employee Role',
                    value: 'update_employee_role'
                },
                {
                    name: 'Exit',
                    value: 'exit'
                }
            ]
        }
    ]);

console.log('Selected Option:', menuOptions);

    switch (menuOptions) {
        case 'get_departments':
            try {
                console.log('Fetching all departments...'); // Debug log
                const departments = await getAllDepartments();
                console.table(departments); // Should display the table if departments are retrieved
            } catch (error) {
                console.error('Error getting departments:', error);
            }
            break;
        

        case 'view_roles':
            const roles = await getAllRoles();
            console.table(roles);
            break;

        case 'view_employees':
            const employees = await getAllEmployees();
            console.table(employees);
            break;

        case 'add_department':
            const { departmentName } = await inquirer.prompt([
                { name: 'departmentName', message: 'Enter the department name:', type: 'input' }
            ]);
            await addDepartment(departmentName);
            console.log('Department added successfully!');
            break;

        case 'add_role':
            const { roleTitle, roleSalary, roleDepartmentId } = await inquirer.prompt([
                { name: 'roleTitle', message: 'Enter the role title:', type: 'input' },
                { name: 'roleSalary', message: 'Enter the role salary:', type: 'number' },
                { name: 'roleDepartmentId', message: 'Enter the department ID for the role:', type: 'number' }
            ]);
            await addRole(roleTitle, roleSalary, roleDepartmentId);
            console.log('Role added successfully!');
            break;

        case 'add_employee':
            const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
                { name: 'firstName', message: 'Enter the employee\'s first name:', type: 'input' },
                { name: 'lastName', message: 'Enter the employee\'s last name:', type: 'input' },
                { name: 'roleId', message: 'Enter the role ID:', type: 'number' },
                { name: 'managerId', message: 'Enter the manager ID (leave blank if none):', type: 'number' }
            ]);
            await addEmployee(firstName, lastName, roleId, managerId || null);
            console.log('Employee added successfully!');
            break;

        case 'update_employee_role':
            const { employeeId, newRoleId } = await inquirer.prompt([
                { name: 'employeeId', message: 'Enter the employee\'s ID to update:', type: 'number' },
                { name: 'newRoleId', message: 'Enter the new role ID:', type: 'number' }
            ]);
            await updateEmployeeRole(employeeId, newRoleId);
            console.log('Employee role updated successfully!');
            break;

        case 'exit':
            process.exit();
            break;
    }


    await menu();
}

// Start
menu();
