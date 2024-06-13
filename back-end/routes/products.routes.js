import { Router } from "express";
import productModel from "../models/product.js";
const router = Router();

router.post("/products", async (req, res) => {
  const { name, price, stock, image } = req.body;
  const newProduct = new productModel({
    name,
    price,
    stock,
    image,
  });
  await newProduct.save();
  res.json({
    message: "Product created",
    product: newProduct,
  });
});

router.get("/products", async (req, res) => {
  const products = await productModel.find();
  res.json({
    products,
  });
});

router.put("/products/:id", async (req, res) => {
  const { name, price, stock, image } = req.body;
  const id = req.params.id;
  const updatedProduct = await productModel.findByIdAndUpdate(
    id,
    {
      name,
      price,
      stock,
      image,
    },
    { new: true }
  );

  res.json({
    message: "Product updated",
    product: updatedProduct,
  });
});

router.get("/products/:id", async (req, res) => {
  const id = req.params.id;
  const product = await productModel.findById(id);
  res.json({
    product,
  });
});

export default router;
