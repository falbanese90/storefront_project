import Client from '../database';

export class DashboardQueries {
    async usersWithOrders(): Promise<{firstname: string, lastname: string}[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT firstName, lastNAME from users INNER JOIN orders ON users.id=orders.user_id;'
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`${err}`);
        }
    }
}