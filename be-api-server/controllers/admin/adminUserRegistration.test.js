const { adminUserRegistration } = require('./adminUserRegistration');
const AdminUser = require('../../models/adminUser');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

jest.mock('../../models/adminUser'); // mock the AdminUser model
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
      send: jest.fn()
    };

    // Default mock implementations
    bcrypt.genSaltSync.mockReturnValue('salt');
    bcrypt.hashSync.mockReturnValue('hashedPassword');
    crypto.randomBytes.mockReturnValue(Buffer.from('1234567890abcdef'));

    AdminUser.findOne.mockResolvedValue(null); // user does not exist
    AdminUser.prototype.save = jest.fn().mockResolvedValue(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should register user successfully', async () => {
    await adminUserRegistration(req, res);

    expect(AdminUser.findOne).toHaveBeenCalledWith({
      $or: [{ email: 'manassantra.contact@gmail.com' }, { mob: '9851058072' }]
    });

    expect(AdminUser.prototype.save).toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledWith({
      status: 'Success',
      status_code: 200,
      message: 'User created successfully'
    });
  });

  test('should return error if user already exists', async () => {
    AdminUser.findOne.mockResolvedValue({ email: 'existing@example.com' });

    await adminUserRegistration(req, res);

    expect(res.send).toHaveBeenCalledWith({
      status: 'Error',
      status_code: 409,
      message: 'User alreay exist! \nTry another email & mobile!'
    });
  });

  test('should return error if required fields are missing', async () => {
    req.body.fullName = null;

    await adminUserRegistration(req, res);

    expect(res.send).toHaveBeenCalledWith({
      status: 'Error',
      status_code: 409,
      message: 'Full-Name / Gender / Password is missing !'
    });
  });

  test('should return warning if email/mob is missing', async () => {
    req.body.email = null;
    req.body.mob = null;

    await adminUserRegistration(req, res);

    expect(res.send).toHaveBeenCalledWith({
      status: 'Warning',
      status_code: 404,
      message: 'Email/Mobile is missing !'
    });
  });

  test('should handle save error', async () => {
    AdminUser.prototype.save = jest.fn().mockResolvedValue(null); // simulate failure

    await adminUserRegistration(req, res);

    expect(res.send).toHaveBeenCalledWith({
      status: 'Error',
      status_code: 409,
      message: 'There is an error! \nTry again later!'
    });
  });
});
