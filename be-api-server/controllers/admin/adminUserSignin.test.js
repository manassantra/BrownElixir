const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { adminUserSession } = require('./adminUserSignin'); // Adjust path as needed

jest.mock('../../models/adminUser', () => ({
  findOne: jest.fn()
}));
const AdminUser = require('../../models/adminUser');

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('adminUserSession', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        username: 'admin@example.com',
        password: 'testpassword'
      }
    };

    res = {
      status: jest.fn(() => res),
      send: jest.fn()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return 400 if username or password is missing', async () => {
    req.body = {};
    await adminUserSession(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      status: 'Warning',
      message: 'Username/Password is missing!'
    });
  });

  test('should return 401 if user is not found', async () => {
    AdminUser.findOne.mockResolvedValue(null);
    await adminUserSession(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith({
      status: 'Warning',
      message: 'User not found!'
    });
  });

  test('should return 401 if password is incorrect', async () => {
    AdminUser.findOne.mockResolvedValue({
      email: req.body.username,
      mob: '9851058072',
      password: 'hashedPassword'
    });

    bcrypt.compare.mockResolvedValue(false);

    await adminUserSession(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith({
      status: 'Warning',
      message: 'Password is incorrect!'
    });
  });

  test('should return 200 and token on successful login', async () => {
    const fakeUser = {
      id: 'user123',
      fullName: 'Admin User',
      email: req.body.username,
      mob: '9851058072',
      password: 'hashedPassword'
    };

    AdminUser.findOne.mockResolvedValue(fakeUser);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('fake-jwt-token');

    await adminUserSession(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      status: 'Success',
      user: fakeUser.fullName,
      authToken: 'fake-jwt-token',
      expiresIn: 7200,
      _id: fakeUser.id
    });
  });
});
