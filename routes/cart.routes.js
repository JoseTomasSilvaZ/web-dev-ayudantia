import { Router } from "express";
import productModel from "../models/product.js";
import cartModel from "../models/cart.js";
const router = Router();

router.get("/cart", async (req, res) => {
  const userId = req.user.id;
  const userCart = await cartModel
    .findOne({ user: userId })
    .populate("products.id");

  res.render("administration", { cart: userCart });
});

router.patch("/cart", async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  const userCart = await cartModel.findOne({ user: userId });

  const productIndex = userCart.products.findIndex(
    (product) => product.id.toString() === productId
  );

  if (productIndex !== -1) {
    userCart.products[productIndex].quantity += quantity;
  } else {
    userCart.products.push({ id: productId, quantity });
  }

  await userCart.save();

  res.json({ message: "Product added to cart", cart: userCart });
});

router.delete("/cart/:productId", async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;

  const userCart = await cartModel.findOne({ user: userId });

  userCart.products = userCart.products.filter(
    (product) => product.id.toString() !== productId
  );

  await userCart.save();

  res.json({ message: "Product removed from cart", cart: userCart });
});

router.post("/cart/buy", async (req, res) => {
  const userId = req.user.id;
  const userCart = await cartModel.findOne({ user: userId });

  userCart.products = [];

  // Aca hacen la logica correspondiente a disminuir el dinero del usuario

  await userCart.save();

  res.json({ message: "Checkout successful" });
});
export default router;
