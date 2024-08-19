const request = require('supertest');
const express = require('express');
const fs = require('fs');
const path = require('path');

jest.mock('fs'); // Mocking the file system module

const app = express();
app.use(express.json());
app.use('/api/orders', require('../routes/orders'));

describe('GET /api/orders', () => {
    let server;

    beforeAll(() => {
        const PORT = 5000;
        server = app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    });

    afterAll(() => {
        server.close();
    });

    it('should return a list of orders', async () => {
        const mockOrders = [
            { orderId: 1, product: 'Product 1', price: 100, seller: 'Seller 1', country: 'Country 1' },
            { orderId: 2, product: 'Product 2', price: 200, seller: 'Seller 2', country: 'Country 2' },
        ];

        fs.readFileSync.mockReturnValue(JSON.stringify(mockOrders));

        const response = await request(app).get('/api/orders');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockOrders);
    });

    it('should return 500 if there is an error reading orders data', async () => {
        fs.readFileSync.mockImplementation(() => { throw new Error('Could not read orders data'); });

        const response = await request(app).get('/api/orders');
        expect(response.statusCode).toBe(500);
        expect(response.text).toBe('Error reading orders data.');
    });
});
