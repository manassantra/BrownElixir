const { adminUserRegistration } = require('./adminUserRegistration'); // adjust path
const AdminUser = require('../../models/adminUser');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

// ✅ Mock modules
jest.mock('../../models/adminUser');
jest.mock('bcrypt');
jest.mock('crypto');

describe('adminUserRegistration', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        fullName: 'Manas Santra',
        email: 'manassantra.contact@gmail.com',
        mob: '9851058072',
        gender: 'male',
        password: 'password'
      }
    };

    res = {
      status: jest.fn(() => res),
      send: jest.fn()
    };

    // Default mocks
    bcrypt.genSaltSync.mockReturnValue('salt');
    bcrypt.hashSync.mockReturnValue('hashedPassword');
    crypto.randomBytes.mockReturnValue(Buffer.from('1234567890abcdef'));
    AdminUser.findOne.mockResolvedValue(null);
    AdminUser.prototype.save = jest.fn().mockResolvedValue(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return 400 if email or mob is missing', async () => {
    req.body.email = null;
    req.body.mob = null;

    await adminUserRegistration(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      status: 'Warning',
      message: 'Email/Mobile is missing!'
    });
  });

  test('should return 400 if required fields are missing', async () => {
    req.body.fullName = null;

    await adminUserRegistration(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      status: 'Error',
      message: 'Full-Name / Gender / Password is missing!'
    });
  });

  test('should return 409 if user already exists', async () => {
    AdminUser.findOne.mockResolvedValue({ email: 'existing@example.com' });

    await adminUserRegistration(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.send).toHaveBeenCalledWith({
      status: 'Error',
      message: 'User already exists! \nTry another email & mobile!'
    });
  });

  test('should return 201 on successful registration', async () => {
    AdminUser.findOne.mockResolvedValue(null);
    AdminUser.prototype.save = jest.fn().mockResolvedValue(true);

    await adminUserRegistration(req, res);

    expect(AdminUser.prototype.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith({
      status: 'Success',
      message: 'User created successfully'
    });
  });

  test('should return 500 if user creation fails', async () => {
    AdminUser.findOne.mockResolvedValue(null);
    AdminUser.prototype.save = jest.fn().mockResolvedValue(null); // simulate DB failure

    await adminUserRegistration(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      status: 'Error',
      message: 'There was an error! \nTry again later!'
    });
  });

  test('should return 500 if exception occurs', async () => {
    AdminUser.findOne.mockResolvedValue(null);
    AdminUser.prototype.save = jest.fn(() => { throw new Error('DB error') });

    await adminUserRegistration(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      status: 'Error',
      message: 'Server error. Please try again later.'
    });
  });
});
