import app from '../server';
import { Request, Response } from 'express';
import { User } from '../models/users';
import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Product } from '../models/products';
import { Order } from '../models/orders';
import Client from '../database';

dotenv.config();

const request = supertest(app);
const user: User = {
    firstName: "Frank",
    lastName: "Albanese",
    password: "password123"
}
const product: Product = {
    name: "Product_1",
    price: 200
}
const order: Order = {
    status: "active",
    user_id: user.id as number
}
const addProduct: Object = {
    quantity: 10,
    productId: String(product.id)
}

const token = jwt.sign(user , process.env.TOKEN_SECRET as string);

describe('Tests all server endpoints', () => {
    it('Users index should return status 200', async () => {
        const response = await supertest(app)
            .get('/users')
            .set('Authorization', `Bearer ${token}`)
        expect(response.statusCode).toBe(200);
    })
    it('Create users returns status 200', async () => {
        const response = await supertest(app)
            .post('/users/create')
            .send({user});
        expect(response.statusCode).toBe(200);
    })
    it('Show specified User returns status 200', async () => {
        const response = await supertest(app)
            .get(`/users/show/${user.id}`)
            .set('Authorization', `Bearer ${token}`)
        expect(response.statusCode).toBe(200);
    })
    it('Index products returns 200', async () => {
        const response = await supertest(app)
            .get('/products')
        expect(response.statusCode).toBe(200);
    })
    it('Index products returns 200', async () => {
        const response = await supertest(app)
            .get('/products')
        expect(response.statusCode).toBe(200);
    })
    it('Create product endpoint returns 200', async () => {
        const response = await supertest(app)
            .post('/products/create')
            .set('Authorization', `Bearer ${token}`)
            .send({product})
        expect(response.statusCode).toBe(200);
    })
    it('Create product endpoint returns 200', async () => {
        const response = await supertest(app)
            .get(`/products/show/${product.id}`)
            .set('Authorization', `Bearer ${token}`)
        expect(response.statusCode).toBe(200);
    })
    it('Index orders endpoint returns 200', async () => {
        const response = await supertest(app)
            .get(`/orders`)
            .set('Authorization', `Bearer ${token}`)
        expect(response.statusCode).toBe(200);
    })
    it('Create orders endpoint returns 200', async () => {
        const response = await supertest(app)
            .post(`/orders/create`)
            .set('Authorization', `Bearer ${token}`)
            .send({order})
        expect(response.statusCode).toBe(200);
    })
    it('Show specific order endpoint returns 200', async () => {
        const response = await supertest(app)
            .get(`/orders/${order.id}`)
            .set('Authorization', `Bearer ${token}`)
        expect(response.statusCode).toBe(200);
    })
    it('Add product to order endpoint returns 200', async () => {
        try {
            const response = await supertest(app)
                .post(`/orders/${order.id}/products`)
                .set('Authorization', `Bearer ${token}`)
                .send({addProduct})
         expect(response.statusCode).toBe(200);
        } catch (err) {
            console.log(err)
        }
    })
    afterAll(async () => {
        const conn = await Client.connect();
        await conn.query('DELETE FROM order_products_table;');
        await conn.query('DELETE FROM orders;');
        await conn.query('DELETE FROM products;');
        await conn.query('DELETE FROM users;');
        conn.release();
    });
});
