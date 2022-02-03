import Client from '../database';

export type Order = {
    id?: number,
    status: string,
    user_id: number
};

export class OrderStore {
    async index(): Promise<Order[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders;'
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`${err}`);
        }
    }
    async create(o: Order): Promise<Order> {
        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *;'
            const result = await conn.query(sql, [o.status, o.user_id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`${err}`);
        }
    }
    async addProduct(quantity: number, productId: string, orderId: string): Promise<Order> {
        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO order_products (quantity, product_id, order_id) VALUES ($1, $2, $3) RETURNING *;';
            const result = await conn.query(sql, [quantity, productId, orderId]);
            conn.release();
            return result.rows[0]
        } catch (err) {
            throw new Error(`${err}`);
        }
    }
}