import { Product, ProductStore } from '../models/products';
import jwt from 'jsonwebtoken';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import auth from '../utilities/auth';

dotenv.config();

const store = new ProductStore();

const index = async (req: Request, res: Response) => {
    try {
        const result = await store.index();
        res.send(result);
    } catch (err) {
        res.send(`${err}`);
    }
};
const show = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const result = await store.show(id);
        res.send(result);
    } catch (err) {
        res.send(`${err}`);
    }
};
const create = async (req: Request, res: Response) => {
    try {
        const product: Product = {
            name: req.body.name,
            price: req.body.price,
        };
        const result = await store.create(product);
        res.send(result);
    } catch (err) {
        res.send(`${err}`);
    }
};

const product_store_routes = (app: express.Application) => {
    app.get('/products', index);
    app.get('/products/show/:id', show);
    app.post('/products/create', auth,  create);
};

export default product_store_routes;
