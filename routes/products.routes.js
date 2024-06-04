import { Router } from "express";
import productModel from "../models/product.js";
const router = Router();

router.get("/products", async (req, res) => {
  const products = await productModel.find();
  res.render("products", { products });
});

router.post("/products", async (req, res) => {
  const { name, price, image, stock } = req.body;
  const newProduct = new productModel({ name, price, image, stock });
  await newProduct.save();
  res.json({ message: "Product saved", product: newProduct });
});

router.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  await productModel.findByIdAndDelete(id);
  res.json({ message: "Product deleted", id });
});

router.patch("/products/:id", async (req, res) => {
  const { id } = req.params;
  const updatedProduct = await productModel.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true }
  );
  res.json({ message: "Product updated", product: updatedProduct });
});

export default router;
