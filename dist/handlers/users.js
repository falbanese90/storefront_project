"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../models/users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const store = new users_1.UserStore();
const index = async (req, res) => {
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
        const result = await store.index();
        res.send(result);
    }
    catch (err) {
        res.send(`${err}`);
    }
};
const show = async (req, res) => {
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
        const user_id = Number(req.params.id);
        const result = await store.show(user_id);
        res.send(result);
    }
    catch (err) {
        res.send(`${err}`);
    }
};
const create = async (req, res) => {
    try {
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
        };
        const result = await store.create(user);
        const token = jsonwebtoken_1.default.sign({ result }, process.env.TOKEN_SECRET);
        res.send(token);
    }
    catch (err) {
        res.send(`${err}`);
    }
};
const authenticate = async (req, res) => {
    try {
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
        };
        const result = await store.authenticate(user.firstName, user.lastName, user.password);
        const token = jsonwebtoken_1.default.sign({ result }, process.env.TOKEN_SECRET);
        res.send(token);
    }
    catch (err) {
        res.status(401);
        res.send(`${err}`);
    }
};
const user_store_routes = (app) => {
    app.get('/users', index);
    app.get('/users/show/:id', show);
    app.post('/users/create', create);
    app.post('/users/authenticate', authenticate);
};
exports.default = user_store_routes;
