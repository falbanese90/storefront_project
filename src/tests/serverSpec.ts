import app from '../server';
import { Request, Response } from 'express';

describe('All endpoints return status 200', () => {
    it('Connection to "/" is status 200', () => {
        app.get('/', (req: Request, res: Response) => {
            const code = res.status;
            expect(code).toBe(200);
        });
    });
    it('Connection to "/products" is status 200', () => {
        app.get('/products', (req: Request, res: Response) => {
            const code = res.status;
            expect(code).toBe(200);
        });
    });
    it('Connection to "/users" is status 200', () => {
        app.get('/users', (req: Request, res: Response) => {
            const code = res.status;
            expect(code).toBe(200);
        });
    });
    it('Connection to "/orders" is status 200', () => {
        app.get('/orders', (req: Request, res: Response) => {
            const code = res.status;
            expect(code).toBe(200);
        });
    });
});
