import { UserStore } from '../models/users';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const store = new UserStore();

const index = async (req: Request, res: Response) => {
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
        const result = await store.index();
        res.send(result);
    } catch (err) {
        res.send(`${err}`);
    }
};

const show = async (req: Request, res: Response) => {
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
        const user_id = Number(req.params.id);
        const result = await store.show(user_id);
        res.send(result);
    } catch (err) {
        res.send(`${err}`);
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
        };
        const result = await store.create(user);
        const token = jwt.sign({ result }, process.env.TOKEN_SECRET as string);
        res.send(token);
    } catch (err) {
        res.send(`${err}`);
    }
};
const authenticate = async (req: Request, res: Response) => {
    try {
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password
        }
        const result = await store.authenticate(user.firstName, user.lastName, user.password);
        const token = jwt.sign({ result }, process.env.TOKEN_SECRET as string);
        res.send(token);
    } catch (err) {
        res.status(401)
        res.send(`${err}`)
    }
}

const user_store_routes = (app: express.Application) => {
    app.get('/users/index', index);
    app.get('/users/show/:id', show);
    app.post('/users/create', create);
    app.post('/users/authenticate', authenticate);
};

export default user_store_routes;
