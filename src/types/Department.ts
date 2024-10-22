import { Client } from 'pg';

class Department {
    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    async addDepartment(client: Client) {
        try {
            const result = await client.query('INSERT INTO department (name) VALUES ($1) RETURNING id', [this.name]);

            if (result.rows.length > 0) {
                this.id = result.rows[0].id;
            } else {
                throw new Error('Department not saved');
            }
        } catch (err) {
            console.error('Error saving department:', err);
        }
    }

    async updateDepartment(client: Client) {
        try {
            await client.query('UPDATE department SET name = $1 WHERE id = $2', [this.name, this.id]);
        } catch (err) {
            console.error('Error updating department name:', err);
        }
    }

    async deleteDepartment(client: Client) {
        try {
            await client.query('DELETE FROM department WHERE id = $1', [this.id]);
        } catch (err) {
            console.error('Error deleting department:', err);
        }
    }
}

export default Department;
