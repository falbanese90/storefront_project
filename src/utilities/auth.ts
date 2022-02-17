import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const auth = async (req: Request, res: Response, next: Function) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader?.split(' ')[1] as string;
        jwt.verify(token as string, process.env.TOKEN_SECRET as string);
        next();
    } catch (err) {
        res.status(401);
        res.send(`${err}`);
        return;
    }
};

export default auth;
