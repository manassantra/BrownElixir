const Order = require('../../models/order');
const updateProductStock = require('../../services/updateStocks');
const {
  generateOrder,
  getOrder,
  getAllOrders,
  updateOrder,
  deleteOrder
} = require('./orderController');

jest.mock('../../models/order');
jest.mock('../../services/updateStocks');

function mockRes() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
}

describe('Order Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('generateOrder', () => {
    it('should create a new order and return success', async () => {
      Order.prototype.save = jest.fn().mockResolvedValue(true);
      const req = {
        body: {
          customerId: 'cust1',
          items: [{ qty: 2, unitPrice: 100 }],
          deliveryAddressId: 'addr1',
          paymentMethod: 'cod'
        }
      };
      const res = mockRes();
      await generateOrder(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ status: 'Success' }));
    });
  });

  describe('getOrder', () => {
    it('should return order if found', async () => {
      Order.findOne.mockResolvedValue({ orderId: 'ORD1' });
      const req = { params: { orderId: 'ORD1' } };
      const res = mockRes();
      await getOrder(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ status: 'Success' }));
    });

    it('should return 404 if order not found', async () => {
      Order.findOne.mockResolvedValue(null);
      const req = { params: { orderId: 'ORD404' } };
      const res = mockRes();
      await getOrder(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  describe('getAllOrders', () => {
    it('should return all orders', async () => {
      Order.find.mockResolvedValue([{ orderId: 'ORD1' }]);
      const req = { query: {} };
      const res = mockRes();
      await getAllOrders(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ status: 'Success' }));
    });
  });

  describe('updateOrder', () => {
    it('should update and return the order', async () => {
      Order.findOneAndUpdate.mockResolvedValue({ orderId: 'ORD1', orderStatus: 'shipped' });
      const req = { params: { orderId: 'ORD1' }, body: { orderStatus: 'shipped' } };
      const res = mockRes();
      await updateOrder(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ status: 'Success' }));
    });

    it('should return 404 if order not found', async () => {
      Order.findOneAndUpdate.mockResolvedValue(null);
      const req = { params: { orderId: 'ORD404' }, body: { orderStatus: 'shipped' } };
      const res = mockRes();
      await updateOrder(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  describe('deleteOrder', () => {
    it('should delete and return success', async () => {
      Order.findOneAndDelete.mockResolvedValue({ orderId: 'ORD1' });
      const req = { params: { orderId: 'ORD1' } };
      const res = mockRes();
      await deleteOrder(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ status: 'Success' }));
    });

    it('should return 404 if order not found', async () => {
      Order.findOneAndDelete.mockResolvedValue(null);
      const req = { params: { orderId: 'ORD404' } };
      const res = mockRes();
      await deleteOrder(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });
  });
});
