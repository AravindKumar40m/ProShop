import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productSchema.js";

const getProduct = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// @desc Create Products
// @route POST /api/products
// @access Private/admin

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "images/sample.jpg",
    brand: "Sample brand",
    category: "Sample Category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const Createdproduct = await product.save();
  res.status(200).json(Createdproduct);
});

// @desc Update a Products
// @route PUT /api/products/:id
// @access Private/admin

const UpdateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;

    const updateProduct = await product.save();
    res.json(updateProduct);
  } else {
    res.status(400);
    throw new Error("Resource not Found");
  }
});

export { getProduct, getProductById, createProduct, UpdateProduct };
