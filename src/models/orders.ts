import Client from '../database';

export type Order = {
    id?: number;
    status: string;
    user_id: number;
};

export class OrderStore {
    async index(): Promise<Order[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders;';
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
            const sql =
                'INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *;';
            const result = await conn.query(sql, [o.status, o.user_id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`${err}`);
        }
    }
    async addProduct(
        quantity: number,
        productId: string,
        orderId: string
    ): Promise<Order> {
        try {
            const conn = await Client.connect();
            const sql =
                'INSERT INTO orders_product (quantity, product_id, order_id) VALUES ($1, $2, $3) RETURNING *;';
            const result = await conn.query(sql, [
                quantity,
                productId,
                orderId,
            ]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`${err}`);
        }
    }
    async show(id: number): Promise<Order[]> {
        try {
            const conn = await Client.connect();
            const sql =
                'SELECT name, price, quantity FROM products INNER JOIN orders_product ON products.id=orders_product.product_id WHERE orders_product.order_id=($1);';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`${err}`);
        }
    }
}
