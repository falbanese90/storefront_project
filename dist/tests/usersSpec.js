"use strict";
// import { type } from 'os';
// import { User, UserStore } from '../models/users';
// import Client from '../database';
// const store = new UserStore();
// describe('Tests database User model functions', () => {
//     const user: User = {
//         id: 1,
//         firstName: 'Frank',
//         lastName: 'Albanese',
//         password: 'password123'
//     }
//     it('User store is defined', () => {
//         expect(store).toBeDefined();
//     })
//     it('Index returns list of all users, which is 0', async () => {
//         const result = await store.index();
//         expect(result).toBeDefined()
//     })
//     it('Creates user and returns it as defined.', async () => {
//         const result = await store.create(user);
//         expect(result).toBeDefined()
//     })
//     it('User show function works by supplying id.', async () => {
//         const result = await store.show(1);
//         expect(result).toBeDefined()
//     })
//     afterAll(async () => {
//         const conn = await Client.connect()
//         await conn.query('DELETE FROM users;')
//     })
// })
