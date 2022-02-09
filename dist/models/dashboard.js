"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardQueries = void 0;
const database_1 = __importDefault(require("../database"));
class DashboardQueries {
    async usersWithOrders() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT firstName, lastNAME from users INNER JOIN orders ON users.id=orders.user_id;';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
}
exports.DashboardQueries = DashboardQueries;
