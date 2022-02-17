"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../models/users");
const database_1 = __importDefault(require("../database"));
const orders_1 = require("../models/orders");
const products_1 = require("../models/products");
const store = new users_1.UserStore();
const orderStore = new orders_1.OrderStore();
const productsStore = new products_1.ProductStore();
describe('Tests all database functions', () => {
    const user = {
        firstName: 'Frank',
        lastName: 'Albanese',
        password: 'password123',
    };
    const order = {
        status: 'active',
        user_id: user.id,
    };
    const product = {
        name: 'Product_1',
        price: 200,
    };
    it('UserStore.index() retrieves a list of users', async () => {
        const result = await store.index();
        expect(result.length).toBeUndefined;
    });
    it('UserStore.show(id) retrieves specified user', async () => {
        const result = await store.show(1);
        expect(result).toBeUndefined();
    });
    it('UserStore.create(user) creates a new user', async () => {
        const result = await store.create(user);
        expect(result).toBeDefined();
    });
    it('UserStore.authenticate(user) authenticates new user', async () => {
        const result = await store.authenticate(user.firstName, user.lastName, user.password);
        expect(result).toBeDefined();
    });
    it('ProductStore.create(product) creates a new product', async () => {
        const result = await productsStore.create(product);
        expect(result).toBeDefined();
    });
    it('ProductStore.index() retrieves index of products', async () => {
        const result = await productsStore.index();
        expect(result).toBeDefined();
    });
    it('ProductStore.show(id) retrieves specified product', async () => {
        const result = await productsStore.show(1);
        expect(result).toBeDefined;
    });
    it('OrderStore.create(order) creates new order', async () => {
        const result = await orderStore.create(order);
        expect(result).toBeDefined();
    });
    it('OrderStore.index() indexes Orders', async () => {
        const result = await orderStore.index();
        expect(result).toBeDefined();
    });
    it('OrderStore.addProduct(quantity, productID, orderID) adds product to order', async () => {
        const result = orderStore.addProduct(10, '1', '1');
        expect(result).toBeDefined();
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
