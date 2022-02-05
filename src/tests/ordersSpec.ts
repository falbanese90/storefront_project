import { Order, OrderStore } from '../models/orders';

const store = new OrderStore();

describe('Orders model retrieves and creates neccesary data from database', () => {
    it('Index returns all orders form database', async () => {
        const result = await store.index();
        expect(result).toBeTruthy();
    })
    it('Create returns newly created order', async () => {
        const o: Order = {
            status: 'active',
            user_id: 5
        }
        const result = await store.create(o);
        expect(result).toBeTruthy();
    })
})