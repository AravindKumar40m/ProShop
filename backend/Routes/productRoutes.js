import express from "express";
import {
  CreateProductReview,
  UpdateProduct,
  createProduct,
  deleteProduct,
  getProduct,
  getProductById,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProduct).post(protect, admin, createProduct);

router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, UpdateProduct)
  .delete(protect, admin, deleteProduct);

router.route("/:id/reviews").post(protect, CreateProductReview);

export default router;
