"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../models/products");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const store = new products_1.ProductStore();
const index = async (req, res) => {
    try {
        const result = await store.index();
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
const create = async (req, res) => {
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
        const product = {
            name: req.body.name,
            price: req.body.price,
        };
        const result = await store.create(product);
        res.send(result);
    }
    catch (err) {
        res.send(`${err}`);
    }
};
const product_store_routes = (app) => {
    app.get('/products/index', index);
    app.get('/products/show/:id', show);
    app.post('/products/create', create);
};
exports.default = product_store_routes;
