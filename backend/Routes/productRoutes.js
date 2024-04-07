import express from "express";
import {
  UpdateProduct,
  createProduct,
  getProduct,
  getProductById,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProduct).post(protect, admin, createProduct);

router.route("/:id").get(getProductById).put(protect, admin, UpdateProduct);

export default router;
