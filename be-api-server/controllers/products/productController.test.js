const { createProduct } = require('./productController');
const Products = require('../../models/product');

jest.mock('../../models/product');

describe('createProduct', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        productName: 'Test Product',
        productCode: 'T123',
        productBrand: 'BrandX',
        categoryName: 'Chocolates',
        flavor: 'Dark',
        description: 'Tasty dark chocolate',
        ingredients: 'Cocoa, Sugar',
        unitPrice: '99.99',
        unitWeight: '100g',
        minQty: '1',
        maxQty: '5',
        inStock: 'true',
        stock: '50',
        userId: 'admin123'
      },
      file: {
        filename: 'test-image.jpg'
      },
      protocol: 'http',
      get: jest.fn(() => 'localhost:3000')
    };

    res = {
      status: jest.fn(() => res),
      send: jest.fn()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return 400 if a required field is missing', async () => {
    delete req.body.productName;

    await createProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      status: 'Error',
      message: expect.stringContaining('Missing field')
    });
  });

  test('should return 400 if image file is missing', async () => {
    req.file = undefined;

    await createProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      status: 'Error',
      message: 'Image file is required!'
    });
  });

  test('should return 201 if product is created successfully', async () => {
    Products.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue(true)
    }));

    await createProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith({
      status: 'Success',
      message: 'Product created successfully!'
    });
  });

  test('should return 409 on save error', async () => {
    Products.mockImplementation(() => ({
      save: jest.fn().mockRejectedValue(new Error('Save failed'))
    }));

    await createProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.send).toHaveBeenCalledWith({
      status: 'Error',
      message: 'Save failed'
    });
  });
});
