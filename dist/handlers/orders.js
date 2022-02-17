"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../models/orders");
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("../utilities/auth"));
dotenv_1.default.config();
const store = new orders_1.OrderStore();
const index = async (_req, res) => {
    try {
        const result = await store.index();
        res.send(result);
    }
    catch (err) {
        res.send(`${err}`);
    }
};
const create = async (req, res) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader?.split(' ')[1];
        const token_content = JSON.parse(atob(token.split('.')[1]));
        const current_user = token_content['result']['id'];
        const order = {
            status: 'active',
            user_id: current_user,
        };
        const result = await store.create(order);
        res.send(result);
    }
    catch (err) {
        res.send(`${err}`);
    }
};
const addProduct = async (req, res) => {
    try {
        const quantity = req.body.quantity;
        const productId = req.body.productId;
        const orderId = req.params.id;
        const result = await store.addProduct(quantity, productId, orderId);
        res.send(result);
    }
    catch (err) {
        res.send(`${err}`);
    }
};
const show = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const result = await store.show(id);
        res.send(result);
    }
    catch (err) {
        res.send(`${err}`);
    }
};
const order_store_routes = (app) => {
    app.get('/orders', auth_1.default, index);
    app.post('/orders/create', auth_1.default, create);
    app.post('/orders/:id/products', auth_1.default, addProduct);
    app.get('/orders/:id', auth_1.default, show);
};
exports.default = order_store_routes;
