import app from '../server';
import { Request, Response } from 'express';

describe('Connection to root status is 200', () => {
    it('Connection to "/" is status 200', () => {
        app.get('/', (req: Request, res: Response) => {
            const code = res.status;
            expect(code).toBe(200);
        });
    });
    it('Connection to "/users/index" is status 200', () => {
        app.get('/users/index', (req: Request, res: Response) => {
            const code = res.status;
            expect(code).toBe(200);
        });
    });
});
