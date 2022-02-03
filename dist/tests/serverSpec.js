"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../server"));
describe('Connection to root status is 200', () => {
    it('Connection to "/" is status 200', () => {
        server_1.default.get('/', (req, res) => {
            const code = res.status;
            expect(code).toBe(200);
        });
    });
    it('Connection to "/" is status 200', () => {
        server_1.default.get('/users/index', (req, res) => {
            const code = res.status;
            expect(code).toBe(200);
        });
    });
});
