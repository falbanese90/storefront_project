import { DashboardQueries } from '../models/dashboard';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const store = new DashboardQueries();

const usersWithOrders = async (req: Request, res: Response) => {
    try {
        const authorizationHeader = req.headers.authorization
        const token = authorizationHeader?.split(' ')[1] as string
        jwt.verify(token, process.env.TOKEN_SECRET as string)
    } catch (err) {
        res.status(401)
        res.send(`${err}`);
        return
    }
    try {
        const result = await store.usersWithOrders();
        res.send(result);
    } catch (err) {
        res.send(`${err}`);
    }
}

const dashboard_routes = async (app: express.Application) => {
    app.get('/users-with-orders', usersWithOrders);
}

export default dashboard_routes;