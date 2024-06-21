import { Router } from "express";
import productModel from "../models/product.js";
const router = Router();

router.get("/products", async (req, res) => {
  try {
    const products = await productModel.find();

    return res.json({
      products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
    });
  }
});

router.post("/products", async (req, res) => {
  const { name, price, stock, image } = req.body;
  try {
    const product = new productModel({
      name,
      price,
      stock,
      image,
    });

    await product.save();

    return res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
    });
  }
});

router.put("/products/:id", async (req, res) => {
  try {
    const { name, price, image, stock } = req.body;
    const id = req.params.id;
    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      { name, price, image, stock },
      { new: true }
    );

    return res.json({
      success: true,
      product: updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
    });
  }
});

export default router;
