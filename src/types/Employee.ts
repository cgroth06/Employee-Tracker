import { Client } from 'pg';

class Employee {
    id: number;
    first_name: string;
    last_name: string;
    role_id: number;
    manager_id: number;

    constructor(id: number, first_name: string, last_name: string, role_id: number, manager_id: number) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.role_id = role_id;
        this.manager_id = manager_id;
    }

    async addEmployee(client: Client) {
        const result = await client.query(
            'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING id',
            [this.first_name, this.last_name, this.role_id, this.manager_id]
        );
        this.id = result.rows[0].id;
        return result;
    }

    async updateEmployee(client: Client) {
        return await client.query('UPDATE employee SET role_id = $1 WHERE id = $2', [this.role_id, this.id]);
    }

    async deleteEmployee(client: Client) {
        return await client.query('DELETE FROM employee WHERE id = $1', [this.id]);
    }
}

export default Employee;
