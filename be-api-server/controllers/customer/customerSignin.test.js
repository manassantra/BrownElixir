const { customerLoginSession } = require('./customerSignin'); // Adjust path
const Customer = require('../../models/customer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// ✅ Mock modules
jest.mock('../../models/customer');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('customerLoginSession', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                username: 'john@example.com',
                password: 'Password123'
            }
        };

        res = {
            status: jest.fn(() => res),
            send: jest.fn()
        };

        // Default mocks
        Customer.findOne.mockResolvedValue({
            id: 'custom123id',
            customerName: 'John Doe',
            password: 'hashedPassword'
        });

        bcrypt.compare.mockResolvedValue(true);
        jwt.sign.mockReturnValue('mockedToken');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return 400 if username or password is missing', async () => {
        req.body.username = null;
        req.body.password = null;

        await customerLoginSession(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            status: 'Warning',
            message: 'Username/Password is missing!'
        });
    });

    test('should return 404 if user is not found', async () => {
        Customer.findOne.mockResolvedValue(null);

        await customerLoginSession(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith({
            status: 'Warning',
            message: 'User not found!'
        });
    });

    test('should return 401 if password is incorrect', async () => {
        bcrypt.compare.mockResolvedValue(false);

        await customerLoginSession(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith({
            status: 'Warning',
            message: 'Password is incorrect!'
        });
    });

    test('should return 200 and token on successful login', async () => {
        process.env.JWT_CUSTOMER_SECRET = 'test-secret';

        await customerLoginSession(req, res);

        expect(jwt.sign).toHaveBeenCalledWith(
            { id: 'custom123id' },
            'test-secret',
            { expiresIn: '2h' }
        );

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({
            status: 'Success',
            user: 'John Doe',
            authToken: 'mockedToken',
            expiresIn: 7200,
            _id: 'custom123id'
        });
    });
});
