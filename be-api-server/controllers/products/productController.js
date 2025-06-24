const crypto = require('crypto');
const Products = require('../../models/product');

// create product (need admin access)
const createProduct = async (req, res) => {
  const requiredFields = [
    'productName', 'productCode', 'productBrand', 'categoryName', 'flavor',
    'description', 'ingredients', 'unitPrice', 'unitWeight',
    'minQty', 'maxQty', 'inStock', 'stock'
  ];

  for (let field of requiredFields) {
    if (req.body[field] === undefined) {
      return res.status(400).send({
        status: "Error",
        message: `Please, Check Missing field: ${field}`
      });
    }
  }

  if (!req.file) {
    return res.status(400).send({ status: 'Error', message: 'Image file is required!' });
  }

  const {
    productName, productCode, productBrand, categoryName, flavor,
    description, ingredients, unitPrice, unitWeight,
    minQty, maxQty, inStock, stock, userId
  } = req.body;

  const imgUrlPath = `${req.protocol}://${req.get('host')}/public/${req.file.filename}`;

  try {
    const newProduct = new Products({
      id: crypto.randomBytes(10).toString("hex"),
      productName,
      productCode,
      productBrand,
      categoryName,
      flavor,
      description,
      ingredients,
      unitPrice: Number(unitPrice),
      unitWeight: Number(unitWeight),
      minQty: parseInt(minQty),
      maxQty: parseInt(maxQty),
      imgUrl: imgUrlPath,
      inStock: inStock === 'true' || inStock === true,
      stock: parseInt(stock),
      isApproved: true,
      createdDate: Date.now(),
      createdBy: userId
    });

    await newProduct.save();

    return res.status(200).send({
      status: "Success",
      message: "Product created successfully!"
    });

  } catch (err) {
    return res.status(409).send({
      status: "Error",
      message: err.message
    });
  }
};

// modify product (need admin access)
const updateProduct = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      status: 'Error',
      message: 'Product ID is required'
    });
  }

  try {
    const {
      productName,
      productCode,
      productBrand,
      categoryName,
      flavor,
      description,
      ingredients,
      unitPrice,
      unitWeight,
      minQty,
      maxQty,
      inStock,
      stock,
      userId
    } = req.body;

    const updateData = {
      ...(productName && { productName: productName.trim() }),
      ...(productCode && { productCode: productCode.trim() }),
      ...(productBrand && { productBrand: productBrand.trim() }),
      ...(categoryName && { categoryName: categoryName.trim() }),
      ...(flavor && { flavor: flavor.trim() }),
      ...(description && { description: description.trim() }),
      ...(ingredients && { ingredients: ingredients.trim() }),
      ...(unitWeight !== undefined && { unitWeight }), // keep as string
      ...(minQty !== undefined && { minQty: parseInt(minQty) }),
      ...(maxQty !== undefined && { maxQty: parseInt(maxQty) }),
      ...(unitPrice !== undefined && { unitPrice: Number(unitPrice) }),
      ...(stock !== undefined && { stock: parseInt(stock) }),
      ...(inStock !== undefined && {
        inStock: inStock === 'true' || inStock === true
      }),
      ...(userId && { updatedBy: userId }),
      updatedDate: Date.now()
    };

    if (req.file) {
      updateData.imgUrl = `${req.protocol}://${req.get('host')}/public/${req.file.filename}`;
    }

    const updatedProduct = await Products.findOneAndUpdate({ id }, updateData, {
      new: true
    });

    if (!updatedProduct) {
      return res.status(404).send({
        status: 'Error',
        message: 'Product not found!'
      });
    }

    return res.status(200).send({
      status: 'Success',
      message: 'Product updated successfully!',
      data: updatedProduct
    });
  } catch (err) {
    return res.status(500).send({
      status: 'Error',
      message: err.message
    });
  }
};

// delete product by ID (admin only)
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      status: 'Error',
      message: 'Product ID is required'
    });
  }

  try {
    const deleted = await Products.findOneAndDelete({ id });

    if (!deleted) {
      return res.status(404).send({
        status: 'Error',
        message: 'Product not found!'
      });
    }

    return res.status(200).send({
      status: 'Success',
      message: 'Product deleted successfully!'
    });
  } catch (err) {
    return res.status(500).send({
      status: 'Error',
      message: err.message
    });
  }
};

// get all products with sorting, pagination, sorting options (public access)
const getAllProducts = async (req, res) => {
  try {
    const {
      category,
      brand,
      flavor,
      inStock,
      search,
      sort = 'asc',
      page = 1,
      limit = 10
    } = req.query;

    const query = {};

    // Text search (partial, case-insensitive)
    if (search) {
      const regex = new RegExp(search.trim(), 'i');
      query.$or = [
        { productName: regex },
        { productCode: regex }
      ];
    }

    // Filters
    if (category) query.categoryName = category;
    if (brand) query.productBrand = brand;
    if (flavor) query.flavor = flavor;
    if (inStock !== undefined) {
      query.inStock = inStock === 'true' || inStock === true;
    }

    // Pagination values
    const pageNumber = parseInt(page);
    const pageSize = parseInt(limit);
    const skip = (pageNumber - 1) * pageSize;

    // Sorting by unitPrice
    const sortOrder = sort === 'desc' ? -1 : 1;

    const projection = {
      _id: 0,
      id: 1,
      productName: 1,
      productCode: 1,
      productBrand: 1,
      categoryName: 1,
      flavor: 1,
      unitPrice: 1,
      unitWeight: 1,
      imgUrl: 1,
      inStock: 1
    };

    const products = await Products.find(query, projection)
      .sort({ unitPrice: sortOrder })
      .skip(skip)
      .limit(pageSize);

    const totalCount = await Products.countDocuments(query);

    return res.status(200).send({
      status: 'Success',
      message: 'PLP data fetched successfully!',
      total: totalCount,
      page: pageNumber,
      pageSize: products.length,
      data: products
    });

  } catch (err) {
    return res.status(500).send({
      status: 'Error',
      message: err.message
    });
  }
};

// get single product by ID (public access)
const getProductById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      status: 'Error',
      message: 'Product ID is required'
    });
  }

  try {
    const product = await Products.findOne({ id });

    if (!product) {
      return res.status(404).send({
        status: 'Error',
        message: 'Product not found!'
      });
    }

    return res.status(200).send({
      status: 'Success',
      message: 'Product fetched successfully!',
      data: product
    });
  } catch (err) {
    return res.status(500).send({
      status: 'Error',
      message: err.message
    });
  }
};


module.exports = { 
  createProduct,
  updateProduct,
  getAllProducts,
  deleteProduct,
  getProductById
};
