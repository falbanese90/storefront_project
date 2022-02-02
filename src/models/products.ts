import Client from '../database';

export type Product = {
    id?: number;
    name: string;
    price: number;
};

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products;';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`${err}`);
        }
    }
    async show(id: number): Promise<Product | null> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products WHERE id=($1);';
            const result = await conn.query(sql, [id]);
            if (!result.rows.length) {
                return null;
            } else {
                return result.rows[0];
            }
        } catch (err) {
            throw new Error(`${err}`);
        }
    }
    async create(p: Product): Promise<Product> {
        try {
            const conn = await Client.connect();
            const sql =
                'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *;';
            const result = await conn.query(sql, [p.name, p.price]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`${err}`);
        }
    }
}
