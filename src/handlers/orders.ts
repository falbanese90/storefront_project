import { Order, OrderStore } from '../models/orders';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
    try {
        const result = await store.index();
        console.log(typeof(result));
        res.send(result);
    } catch (err) {
        res.send(`${err}`);
    }
}
const create = async (req: Request, res: Response) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader?.split(' ')[1] as string;
        jwt.verify(token as string, process.env.TOKEN_SECRET as string);
    } catch (err) {
        res.status(401);
        res.send(`${err}`);
        return;
    }
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader?.split(' ')[1] as string;
        const token_content = JSON.parse(atob(token.split('.')[1]));
        const current_user = token_content['result']['id'] as number;
        const order: Order = {
            status: 'active',
            user_id: current_user
        }
        const result = await store.create(order);
        res.send(result);
    } catch (err) {
        res.send(`${err}`);
    }
};
const addProduct = async (req: Request, res: Response) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader?.split(' ')[1] as string;
        jwt.verify(token as string, process.env.TOKEN_SECRET as string);
    } catch (err) {
        res.status(401);
        res.send(`${err}`);
        return;
    }
    try {
        const quantity = req.body.quantity as number
        const productId = req.body.productId as string
        const orderId = req.params.id as string
        const result = await store.addProduct(quantity, productId, orderId);
        res.send(result);
    } catch (err) {
        res.send(`${err}`);
    }
}


const order_store_routes = (app: express.Application) => {
    app.get('/orders', index);
    app.post('/orders/create', create);
    app.post('/orders/:id/products', addProduct);
}

export default order_store_routes;