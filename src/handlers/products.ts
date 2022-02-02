import { Product, ProductStore } from '../models/products';
import jwt from 'jsonwebtoken';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config()

const store = new ProductStore();

const index = async (req: Request, res: Response) => {
    try {
        const result = await store.index();
        res.send(result);
    } catch (err) {
        res.send(`${err}`);
    }
}
const show = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const result = await store.show(id);
        res.send(result)
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
        const product: Product = {
            name: req.body.name,
            price: req.body.price
        }
        const result = await store.create(product);
        res.send(result)
    } catch (err) {
        res.send(`${err}`);
    }
};

const product_store_routes = (app: express.Application) => {
    app.get('/products/index', index)
    app.get('/products/show/:id', show)
    app.post('/products/create', create)
}

export default product_store_routes;