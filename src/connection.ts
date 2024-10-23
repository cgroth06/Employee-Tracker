import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';
dotenv.config();


export const createClient = () => {
    const client = new Client({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: 'localhost',
        database: process.env.DB_NAME,
        port: Number(process.env.DB_PORT) ||  5432,
    });
        return client;
};
