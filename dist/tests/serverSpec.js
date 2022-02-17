"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../server"));
describe('All endpoints return status 200', () => {
    it('Connection to "/" is status 200', () => {
        server_1.default.get('/', (req, res) => {
            const code = res.status;
            expect(code).toBe(200);
        });
    });
    it('Connection to "/products" is status 200', () => {
        server_1.default.get('/products', (req, res) => {
            const code = res.status;
            expect(code).toBe(200);
        });
    });
    it('Connection to "/products" is status 401 - unauthorized', () => {
        server_1.default.post('/products/create', (req, res) => {
            const code = res.status;
            expect(code).toBe(401);
        });
    });
    it('Connection to "/products/show/8" is status 404 - Not Found', () => {
        server_1.default.get('/products/show/8', (req, res) => {
            const code = res.status;
            expect(code).toBe(404);
        });
    });
    it('Connection to "/users" is status 401 - unathorized', () => {
        server_1.default.get('/users', (req, res) => {
            const code = res.status;
            expect(code).toBe(401);
        });
    });
    it('Connection to "/users/create" is status 200', () => {
        server_1.default.post('/users/create', (req, res) => {
            const code = res.status;
            expect(code).toBe(200);
        });
    });
    it('Connection to "/users/authenticate" is status 401', () => {
        server_1.default.post('/users/authenticate', (req, res) => {
            const code = res.status;
            expect(code).toBe(401);
        });
    });
    it('Connection to "/orders" is status 200', () => {
        server_1.default.get('/orders', (req, res) => {
            const code = res.status;
            expect(code).toBe(200);
        });
    });
    it('Connection to "/orders/create" is status 401', () => {
        server_1.default.post('/orders/create', (req, res) => {
            const code = res.status;
            expect(code).toBe(401);
        });
    });
    it('Connection to "/orders/id/10" is status 401', () => {
        server_1.default.get('/orders/id/10', (req, res) => {
            const code = res.status;
            expect(code).toBe(401);
        });
    });
    it('Connection to "/orders/id/10/products" is status 401', () => {
        server_1.default.post('/orders/id/10/products', (req, res) => {
            const code = res.status;
            expect(code).toBe(401);
        });
    });
});
