import app from '../server';
import express, { Request, Response } from 'express';

describe('Connection to root status is 200', () => {
    it('Connection to "/" is status 200', () => {
        app.get('/', (req: Request, res: Response) => {
            const code = res.status;
            expect(code).toBe(200);
        });
    });
});