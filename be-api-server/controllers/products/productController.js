const crypto = require('crypto');
const Products = require('../../models/product');

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

  const imgUrlPath = `${req.protocol}://${req.get('host')}/${req.file.filename}`;

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
      unitPrice,
      unitWeight,
      minQty,
      maxQty,
      imgUrl: imgUrlPath,
      inStock,
      stock,
      isApproved: true,
      createdDate: Date.now(),
      createdBy: userId
    });

    await newProduct.save();

    return res.status(201).send({
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

module.exports = { createProduct };
