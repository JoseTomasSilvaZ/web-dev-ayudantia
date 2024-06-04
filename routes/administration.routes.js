import { Router } from "express";
import productModel from "../models/product.js";
const router = Router();

router.get("/admin", async (req, res) => {
  const products = await productModel.find().lean();
  res.render("administration", { products });
});

router.get("/admin/create-product", async (req, res) => {
  res.render("create-product");
});

router.get("/admin/update-product/:id", async (req, res) => {
  const { id } = req.params;
  const product = await productModel.findById(id).lean();
  res.render("update-product", { product });
});

export default router;
