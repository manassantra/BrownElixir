const crypto = require('crypto');
const Products = require('../../models/category');


const createProductCategory = async (req, res) => {
  try {
    const { categoryName, description } = req.body;

    if (!categoryName || !description) {
      return res.status(400).json({ error: 'Name and description are required' });
    }

    const imgUrlPath = `${process.env.HOST}/public/${req.file.filename}`;

    const newCategory = new Products({
      id: crypto.randomBytes(16).toString('hex'),
      categoryName,
      description,
      imgUrl: imgUrlPath,
      isApproved: true,
      createdDate: new Date(),
      createdBy: req.body.userId || 'system-admin',
    });

    await newCategory.save();
    return res.status(201).json({message: 'Product category created successfully'});
  } catch (error) {
    console.error('Error creating product category:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

const getProductCategories = async (req, res) => {
  try {
    const categories = await Products.find();
    return res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching product categories:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

const getProductCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Products.find({ id });
    if (!category) {
        return res.status(404).json({ error: 'Product category not found' });
        }
    return res.status(200).json(category);
  } catch (error) {
    console.error('Error fetching product category:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

const updateProductCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryName, description } = req.body;

    if (!categoryName || !description) {
      return res.status(400).json({ error: 'Name and description are required' });
    }

    if (req.file) {
      var imgUrlPath = `${process.env.HOST}/public/${req.file.filename}`;
    }

    const updatedCategory = await Products.findOneAndUpdate(
      { id },
      { categoryName: categoryName },
      { description: description },
      { imgUrl: imgUrlPath || req.body.imgUrl },
      { isApproved: true },
      { createdDate: new Date() },
      { createdBy: req.body.userId || 'system-admin' },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ error: 'Product category not found' });
    }

    return res.status(200).json({message: 'Product category updated successfully'});
  } catch (error) {
    console.error('Error updating product category:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

const deleteProductCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Products.findOneAndDelete({ id });
    if (!deletedCategory) {
      return res.status(404).json({ error: 'Product category not found' });
    }
    return res.status(200).json({message: 'Product category deleted successfully'});
  } catch (error) {
    console.error('Error deleting product category:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
    createProductCategory,
    getProductCategories,
    getProductCategoryById,
    updateProductCategory,
    deleteProductCategory
};
