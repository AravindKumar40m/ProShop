import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productSchema.js";

const getProduct = asyncHandler(async (req, res) => {
  const pageSize = 1;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};

  const count = await Product.countDocuments({ ...keyword });

  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
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

// @desc Delete a Products
// @route DELETE /api/products/:id
// @access Private/admin

const deleteProduct = asyncHandler(async (req, res) => {
  if (req.params.id) {
    await Product.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Product deleted" });
  } else {
    res.status(400);
    throw new Error("Resource not Found");
  }
});

// @desc Create a new review
// @route POST /api/products/:id/reviews
// @access Private

const CreateProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({ message: "Review added" });
  } else {
    res.status(400);
    throw new Error("Resource not Found");
  }
});

export {
  getProduct,
  getProductById,
  createProduct,
  UpdateProduct,
  deleteProduct,
  CreateProductReview,
};
