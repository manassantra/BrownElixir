const Products = require('../models/product');

// Utility: reduce product stock
const updateProductStock = async (items) => {
  for (const item of items) {
    const product = await Products.findById(item.productId);
    if (!product) throw new Error(`Product ${item.productName} not found`);
    if (product.stock < item.qty) throw new Error(`Insufficient stock for ${item.productName}`);
    product.stock -= item.qty;
    await product.save();
  }
};

module.exports = updateProductStock;