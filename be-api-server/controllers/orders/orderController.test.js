const request = require('supertest');
const app = require('../../app'); // Adjust path if needed
const Order = require('../../models/order');

jest.mock('../../models/order');
jest.mock('../../services/updateStocks');

describe('Order Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /orders', () => {
    it('should create a new order', async () => {
      Order.prototype.save.mockResolvedValueOnce(true);
      const res = await request(app)
        .post('/orders')
        .send({
          customerId: 'cust1',
          items: [{ qty: 2, unitPrice: 100 }],
          deliveryAddressId: 'addr1',
          paymentMethod: 'cod'
        });
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('Success');
    });
  });

  describe('GET /orders/:orderId', () => {
    it('should get an order by orderId', async () => {
      Order.findOne.mockResolvedValueOnce({ orderId: 'ORD1' });
      const res = await request(app).get('/orders/ORD1');
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('Success');
    });
  });

  describe('GET /orders', () => {
    it('should get all orders', async () => {
      Order.find.mockResolvedValueOnce([{ orderId: 'ORD1' }]);
      const res = await request(app).get('/orders');
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('Success');
    });
  });

  describe('PUT /orders/:orderId', () => {
    it('should update an order', async () => {
      Order.findOneAndUpdate.mockResolvedValueOnce({ orderId: 'ORD1', updated: true });
      const res = await request(app)
        .put('/orders/ORD1')
        .send({ orderStatus: 'shipped' });
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('Success');
    });
  });

  describe('DELETE /orders/:orderId', () => {
    it('should delete an order', async () => {
      Order.findOneAndDelete.mockResolvedValueOnce({ orderId: 'ORD1' });
      const res = await request(app).delete('/orders/ORD1');
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('Success');
    });
  });
});
