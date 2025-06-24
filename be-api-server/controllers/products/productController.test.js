const { createProduct, updateProduct, deleteProduct, getAllProducts, getProductById } = require('./productController');
const Products = require('../../models/product');

jest.mock('../../models/product');

describe('Product Controller - Negative & Edge Cases', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        productName: 'Test',
        productCode: 'T123',
        productBrand: 'BrandX',
        categoryName: 'Chocolates',
        flavor: 'Dark',
        description: 'Delicious',
        ingredients: 'Cocoa, Sugar',
        unitPrice: '99.99',
        unitWeight: '100',
        minQty: '1',
        maxQty: '5',
        inStock: 'true',
        stock: '50',
        userId: 'admin123'
      },
      file: {
        filename: 'image.jpg'
      },
      protocol: 'http',
      get: jest.fn(() => 'localhost:3000'),
      params: { id: 'prod123' },
      query: {}
    };

    res = {
      status: jest.fn(() => res),
      send: jest.fn()
    };
  });

  afterEach(() => jest.clearAllMocks());

  test('createProduct - should return 400 if a required field is missing', async () => {
    delete req.body.productName;
    await createProduct(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
      status: 'Error',
      message: expect.stringContaining('productName')
    }));
  });

  test('createProduct - should return 400 if image file is missing', async () => {
    delete req.file;
    await createProduct(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      status: 'Error',
      message: 'Image file is required!'
    });
  });

  test('updateProduct - should return 400 if product ID is missing', async () => {
    delete req.params.id;
    await updateProduct(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      status: 'Error',
      message: 'Product ID is required'
    });
  });

  test('updateProduct - should return 404 if product not found', async () => {
    Products.findOneAndUpdate.mockResolvedValue(null);
    await updateProduct(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({
      status: 'Error',
      message: 'Product not found!'
    });
  });

  test('deleteProduct - should return 400 if ID is missing', async () => {
    delete req.params.id;
    await deleteProduct(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      status: 'Error',
      message: 'Product ID is required'
    });
  });

  test('deleteProduct - should return 404 if product not found', async () => {
    Products.findOneAndDelete.mockResolvedValue(null);
    await deleteProduct(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({
      status: 'Error',
      message: 'Product not found!'
    });
  });

  test('getProductById - should return 400 if ID is missing', async () => {
    delete req.params.id;
    await getProductById(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      status: 'Error',
      message: 'Product ID is required'
    });
  });

  test('getProductById - should return 404 if product not found', async () => {
    Products.findOne.mockResolvedValue(null);
    await getProductById(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({
      status: 'Error',
      message: 'Product not found!'
    });
  });
});
