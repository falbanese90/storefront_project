"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_1 = require("../models/dashboard");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const store = new dashboard_1.DashboardQueries();
const usersWithOrders = async (req, res) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader?.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    }
    catch (err) {
        res.status(401);
        res.send(`${err}`);
        return;
    }
    try {
        const result = await store.usersWithOrders();
        res.send(result);
    }
    catch (err) {
        res.send(`${err}`);
    }
};
const dashboard_routes = async (app) => {
    app.get('/users-with-orders', usersWithOrders);
};
exports.default = dashboard_routes;
