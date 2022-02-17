"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../models/products");
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("../utilities/auth"));
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
    app.get('/products', index);
    app.get('/products/show/:id', show);
    app.post('/products/create', auth_1.default, create);
};
exports.default = product_store_routes;
