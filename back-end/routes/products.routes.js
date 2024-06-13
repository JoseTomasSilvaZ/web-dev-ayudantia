import { Router } from "express";
import productModel from "../models/product.js";
const router = Router();

router.post("/products", async (req, res) => {
  const { name, price, stock, image } = req.body;

  const newProduct = new productModel({
    image,
    name,
    price,
    stock,
  });

  await newProduct.save();
  res.status(201).json({
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

  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      { name, price, stock, image },
      { new: true }
    );

    res.status(200).json({
      message: "Product updated",
      product: updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong when updating the product",
    });
  }
});

router.get("/products", async (req, res) => {
  const products = await productModel.find();
  return res.json({
    products,
  });
});

router.get("/products/:id", async (req, res) => {
  const id = req.params.id;
  const product = await productModel.findById(id);
  return res.json({
    product,
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
