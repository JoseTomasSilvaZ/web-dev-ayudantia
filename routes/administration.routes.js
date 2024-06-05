import { Router } from "express";
import productModel from "../models/product.js";
import { authenticate } from "../middlewares/auth.js";
const router = Router();

router.get("/admin", authenticate, async (req, res) => {
  const products = await productModel.find().lean();
  res.render("administration", { products });
});

router.get("/admin/create-product", authenticate, async (req, res) => {
  res.render("create-product");
});

router.get("/admin/update-product/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const product = await productModel.findById(id).lean();
  res.render("update-product", { product });
});

export default router;
