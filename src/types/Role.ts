import { Client } from 'pg';

class Role {
    id: number;
    title: string;
    salary: number;
    department_id: number;

    constructor(id: number, title: string, salary: number, department_id: number) {
        this.id = id;
        this.title = title;
        this.salary = salary;
        this.department_id = department_id;
    }

    async addRole(client: Client) {
        try {
            const result = await client.query(
                'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING id',
                [this.title, this.salary, this.department_id]
            );
            if (result.rows.length > 0) {
                this.id = result.rows[0].id;
            } else {
                throw new Error('Role not saved');
            }
        } catch (err) {
            console.error('Error saving role:', err);
        }
    }

    async updateRole(client: Client) {
        try {
            await client.query(
                'UPDATE role SET title = $1, salary = $2, department_id = $3 WHERE id = $4',
                [this.title, this.salary, this.department_id, this.id]
            );
        } catch (err) {
            console.error('Error updating role:', err);
        }
    }

    async deleteRole(client: Client) {
        try {
            await client.query('DELETE FROM role WHERE id = $1', [this.id]);
        } catch (err) {
            console.error('Error deleting role:', err);
        }
    }
}

export default Role;
