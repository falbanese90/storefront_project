"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
class UserStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users;';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users WHERE id=($1);';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    async create(u) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO users (firstName, lastName, password) VALUES ($1, $2, $3) RETURNING *;';
            const hash = bcrypt_1.default.hashSync((u.password + process.env.PEPPER), parseInt(process.env.SALTROUNDS));
            const result = await conn.query(sql, [
                u.firstName,
                u.lastName,
                hash,
            ]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    async authenticate(firstName, lastName, password) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users WHERE firstName=($1) AND lastName=($2);';
            const result = await conn.query(sql, [firstName, lastName]);
            conn.release();
            if (result.rows.length) {
                const user = result.rows[0];
                if (bcrypt_1.default.compareSync((password + process.env.PEPPER), user.password)) {
                    return user;
                }
                else {
                    throw new Error(`Could not validate user ${firstName} ${lastName}`);
                }
            }
            else {
                throw new Error(`User ${firstName} ${lastName} does not exist..`);
            }
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
}
exports.UserStore = UserStore;
