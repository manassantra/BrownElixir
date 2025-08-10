const Customer = require('../../models/customer');
const {
  getAllCustomersList,
  getCustomerDetails,
  updateCustomerContactInfo,
  deleteCustomerProfile
} = require('./customerController');

jest.mock('../../models/customer');

function mockRes() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
}

describe('Customer Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllCustomersList', () => {
    it('should return all customers', async () => {
      Customer.find.mockResolvedValue([{ id: 'cust1' }]);
      const req = {};
      const res = mockRes();
      await getAllCustomersList(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ status: 'Success' }));
    });

    it('should handle errors', async () => {
      Customer.find.mockRejectedValue(new Error('DB error'));
      const req = {};
      const res = mockRes();
      await getAllCustomersList(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe('getCustomerDetails', () => {
    it('should return customer details if found', async () => {
      Customer.findOne.mockResolvedValue({ id: 'cust1' });
      const req = { params: { id: 'cust1' } };
      const res = mockRes();
      await getCustomerDetails(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ status: 'Success' }));
    });

    it('should return 404 if customer not found', async () => {
      Customer.findOne.mockResolvedValue(null);
      const req = { params: { id: 'cust404' } };
      const res = mockRes();
      await getCustomerDetails(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it('should handle errors', async () => {
      Customer.findOne.mockRejectedValue(new Error('DB error'));
      const req = { params: { id: 'cust1' } };
      const res = mockRes();
      await getCustomerDetails(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe('updateCustomerContactInfo', () => {
    it('should update and return customer contact info', async () => {
      Customer.findOneAndUpdate.mockResolvedValue({ id: 'cust1', email: 'a@b.com' });
      const req = { params: { id: 'cust1' }, body: { email: 'a@b.com' } };
      const res = mockRes();
      await updateCustomerContactInfo(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ status: 'Success' }));
    });

    it('should return 400 if no email or mob provided', async () => {
      const req = { params: { id: 'cust1' }, body: {} };
      const res = mockRes();
      await updateCustomerContactInfo(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should return 404 if customer not found', async () => {
      Customer.findOneAndUpdate.mockResolvedValue(null);
      const req = { params: { id: 'cust404' }, body: { email: 'a@b.com' } };
      const res = mockRes();
      await updateCustomerContactInfo(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it('should handle errors', async () => {
      Customer.findOneAndUpdate.mockRejectedValue(new Error('DB error'));
      const req = { params: { id: 'cust1' }, body: { email: 'a@b.com' } };
      const res = mockRes();
      await updateCustomerContactInfo(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe('deleteCustomerProfile', () => {
    it('should delete and return customer', async () => {
      Customer.findOneAndDelete.mockResolvedValue({ id: 'cust1' });
      const req = { params: { id: 'cust1' } };
      const res = mockRes();
      await deleteCustomerProfile(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ status: 'Success' }));
    });

    it('should return 404 if customer not found', async () => {
      Customer.findOneAndDelete.mockResolvedValue(null);
      const req = { params: { id: 'cust404' } };
      const res = mockRes();
      await deleteCustomerProfile(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it('should handle errors', async () => {
      Customer.findOneAndDelete.mockRejectedValue(new Error('DB error'));
      const req = { params: { id: 'cust1' } };
      const res = mockRes();
      await deleteCustomerProfile(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});
