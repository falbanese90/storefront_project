import dotenv from 'dotenv';
import Client from '../database';
import bcrypt from 'bcrypt';

dotenv.config();

export type User = {
    id?: number;
    firstName: string;
    lastName: string;
    password: string;
};

export class UserStore {
    async index(): Promise<User[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users;';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`${err}`);
        }
    }
    async show(id: number): Promise<User> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users WHERE id=($1);';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`${err}`);
        }
    }
    async create(u: User): Promise<User> {
        try {
            const conn = await Client.connect();
            const sql =
                'INSERT INTO users (firstName, lastName, password) VALUES ($1, $2, $3) RETURNING *;';
            const hash = bcrypt.hashSync(
                (u.password + process.env.PEPPER) as string,
                parseInt(process.env.SALTROUNDS as string)
            );
            const result = await conn.query(sql, [
                u.firstName,
                u.lastName,
                hash,
            ]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`${err}`);
        }
    }
    async authenticate(
        firstName: string,
        lastName: string,
        password: string
    ): Promise<User> {
        try {
            const conn = await Client.connect();
            const sql =
                'SELECT * FROM users WHERE firstName=($1) AND lastName=($2);';
            const result = await conn.query(sql, [firstName, lastName]);
            conn.release();
            if (result.rows.length) {
                const user = result.rows[0];
                if (
                    bcrypt.compareSync(
                        (password + process.env.PEPPER) as string,
                        user.password
                    )
                ) {
                    return user;
                } else {
                    throw new Error(
                        `Could not validate user ${firstName} ${lastName}`
                    );
                }
            } else {
                throw new Error(
                    `User ${firstName} ${lastName} does not exist..`
                );
            }
        } catch (err) {
            throw new Error(`${err}`);
        }
    }
}
