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
    it('Connection to "/products" is status 401 - unauthorized', () => {
        app.post('/products/create', (req: Request, res: Response) => {
            const code = res.status;
            expect(code).toBe(401);
        });
    });
    it('Connection to "/products/show/8" is status 404 - Not Found', () => {
        app.get('/products/show/8', (req: Request, res: Response) => {
            const code = res.status;
            expect(code).toBe(404);
        });
    });

    it('Connection to "/users" is status 401 - unathorized', () => {
        app.get('/users', (req: Request, res: Response) => {
            const code = res.status;
            expect(code).toBe(401);
        });
    });
    it('Connection to "/users/create" is status 200', () => {
        app.post('/users/create', (req: Request, res: Response) => {
            const code = res.status;
            expect(code).toBe(200);
        });
    });
    it('Connection to "/users/authenticate" is status 401', () => {
        app.post('/users/authenticate', (req: Request, res: Response) => {
            const code = res.status;
            expect(code).toBe(401);
        });
    });

    it('Connection to "/orders" is status 200', () => {
        app.get('/orders', (req: Request, res: Response) => {
            const code = res.status;
            expect(code).toBe(200);
        });
    });
    it('Connection to "/orders/create" is status 401', () => {
        app.post('/orders/create', (req: Request, res: Response) => {
            const code = res.status;
            expect(code).toBe(401);
        });
    });
    it('Connection to "/orders/id/10" is status 401', () => {
        app.get('/orders/id/10', (req: Request, res: Response) => {
            const code = res.status;
            expect(code).toBe(401);
        });
    });
    it('Connection to "/orders/id/10/products" is status 401', () => {
        app.post('/orders/id/10/products', (req: Request, res: Response) => {
            const code = res.status;
            expect(code).toBe(401);
        });
    });
});
