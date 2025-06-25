const { createCustomer } = require('./customerRegistration');
const Customer = require('../../models/customer');
const bcrypt = require('bcrypt');
const crypto = require('crypto');


jest.mock('../../models/customer');
jest.mock('bcrypt');
jest.mock('crypto');

describe('createCustomer', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        customerName: 'John Doe',
        email: 'john@example.com',
        mob: '9876543210',
        gender: 'male',
        password: 'Password123'
      }
    };

    res = {
      status: jest.fn(() => res),
      send: jest.fn()
    };

    bcrypt.genSaltSync.mockReturnValue('salt');
    bcrypt.hashSync.mockReturnValue('hashedPassword');
    crypto.randomBytes.mockReturnValue(Buffer.from('1234567890abcdef'));
    Customer.findOne.mockResolvedValue(null);
    Customer.prototype.save = jest.fn().mockResolvedValue(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return 400 if email or mob is missing', async () => {
    req.body.email = null;
    req.body.mob = null;

    await createCustomer(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      status: 'Warning',
      message: 'Email/Mobile is missing!'
    });
  });

  test('should return 400 if required fields are missing', async () => {
    req.body.customerName = null;

    await createCustomer(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      status: 'Error',
      message: 'Name / Gender / Password is missing!'
    });
  });

  test('should return 409 if user already exists', async () => {
    Customer.findOne.mockResolvedValue({ email: 'john@example.com' });

    await createCustomer(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.send).toHaveBeenCalledWith({
      status: 'Error',
      message: 'User already exists! \nTry another email & mobile!'
    });
  });

  test('should return 201 on successful creation', async () => {
    Customer.findOne.mockResolvedValue(null);
    Customer.prototype.save = jest.fn().mockResolvedValue(true);

    await createCustomer(req, res);

    expect(Customer.prototype.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith({
      status: 'Success',
      message: 'User created successfully'
    });
  });

  test('should return 500 if saving customer fails', async () => {
    Customer.findOne.mockResolvedValue(null);
    Customer.prototype.save = jest.fn().mockResolvedValue(null); // Simulate DB save failure

    await createCustomer(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      status: 'Error',
      message: 'There was an error! \nTry again later!'
    });
  });

  test('should return 500 if an exception occurs', async () => {
    Customer.findOne.mockResolvedValue(null);
    Customer.prototype.save = jest.fn(() => { throw new Error('DB error') });

    await createCustomer(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      status: 'Error',
      message: 'Server error. Please try again later.'
    });
  });
});
