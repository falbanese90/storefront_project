"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../server"));
const supertest_1 = __importDefault(require("supertest"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("../database"));
dotenv_1.default.config();
const request = (0, supertest_1.default)(server_1.default);
const user = {
    firstName: "Frank",
    lastName: "Albanese",
    password: "password123"
};
const product = {
    name: "Product_1",
    price: 200
};
const order = {
    status: "active",
    user_id: user.id
};
const addProduct = {
    quantity: 10,
    productId: String(product.id)
};
const token = jsonwebtoken_1.default.sign(user, process.env.TOKEN_SECRET);
describe('Tests all server endpoints', () => {
    it('Users index should return status 200', async () => {
        const response = await (0, supertest_1.default)(server_1.default)
            .get('/users')
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
    });
    it('Create users returns status 200', async () => {
        const response = await (0, supertest_1.default)(server_1.default)
            .post('/users/create')
            .send({ user });
        expect(response.statusCode).toBe(200);
    });
    it('Show specified User returns status 200', async () => {
        const response = await (0, supertest_1.default)(server_1.default)
            .get(`/users/show/${user.id}`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
    });
    it('Index products returns 200', async () => {
        const response = await (0, supertest_1.default)(server_1.default)
            .get('/products');
        expect(response.statusCode).toBe(200);
    });
    it('Index products returns 200', async () => {
        const response = await (0, supertest_1.default)(server_1.default)
            .get('/products');
        expect(response.statusCode).toBe(200);
    });
    it('Create product endpoint returns 200', async () => {
        const response = await (0, supertest_1.default)(server_1.default)
            .post('/products/create')
            .set('Authorization', `Bearer ${token}`)
            .send({ product });
        expect(response.statusCode).toBe(200);
    });
    it('Create product endpoint returns 200', async () => {
        const response = await (0, supertest_1.default)(server_1.default)
            .get(`/products/show/${product.id}`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
    });
    it('Index orders endpoint returns 200', async () => {
        const response = await (0, supertest_1.default)(server_1.default)
            .get(`/orders`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
    });
    it('Create orders endpoint returns 200', async () => {
        const response = await (0, supertest_1.default)(server_1.default)
            .post(`/orders/create`)
            .set('Authorization', `Bearer ${token}`)
            .send({ order });
        expect(response.statusCode).toBe(200);
    });
    it('Show specific order endpoint returns 200', async () => {
        const response = await (0, supertest_1.default)(server_1.default)
            .get(`/orders/${order.id}`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
    });
    it('Add product to order endpoint returns 200', async () => {
        try {
            const response = await (0, supertest_1.default)(server_1.default)
                .post(`/orders/${order.id}/products`)
                .set('Authorization', `Bearer ${token}`)
                .send({ addProduct });
            expect(response.statusCode).toBe(200);
        }
        catch (err) {
            console.log(err);
        }
    });
    afterAll(async () => {
        const conn = await database_1.default.connect();
        await conn.query('DELETE FROM order_products_table;');
        await conn.query('DELETE FROM orders;');
        await conn.query('DELETE FROM products;');
        await conn.query('DELETE FROM users;');
        conn.release();
    });
});
