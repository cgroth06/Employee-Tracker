import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';
dotenv.config();


export const createClient = () => {
    return new Client({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: 'localhost',
        database: process.env.DB_NAME,
    });
};
// client.connect();

// const connectToDb = async () => {
//     try {
//         await pool.connect();
//         console.log('Connected to the database');
//     } catch (err) {
//         console.error('Database connection error', err.stack);
//         process.exit(1);
//     }
// };
   
// export { pool, connectToDb };


// class Database {
//     async getEmployees() {
//         return await this.query('SELECT * FROM employee');
//     }

//     async getRoles() {
//         return await this.query('SELECT * FROM role');
//     }

//     async getDepartments() {
//         return await this.query('SELECT * FROM department');
//     }   

//     addEmployee(employee: Employee) {
//         const { first_name, last_name, role_id, manager_id } = employee;
//         return this.query(
//             'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
//             [first_name, last_name, role_id, manager_id]
//         );
//     }

//     updateEmployee(employeeID: number, roleID: number) {
//         return this.query('UPDATE employee SET role_id = $1 WHERE id = $2', [roleID, employeeID]);
//     };

//     removeEmployee(employeeID: number) {
//         return this.query('DELETE FROM employee WHERE id = $1', [employeeID]);
//     };

//     query(queryString: string, values?: any[]) {
//         // Implementation of the query method
//     }
// }

// export default client;


