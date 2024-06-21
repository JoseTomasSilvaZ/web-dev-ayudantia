import { Router } from "express";
import { authenticate } from "../middlewares/auth.js";
import cartModel from "../models/cart.js";
import walletModel from "../models/wallet.js";

const router = Router();

router.put("/cart", authenticate, async (req, res) => {
  const userId = req.user.id;
  try {
    const { productId, action } = req.body;

    const cart = await cartModel.findOne({ user: userId }).lean();

    const productIndex = cart.products.findIndex(
      (product) => product.id === productId
    );

    if (productIndex === -1) {
      cart.products.push({ id: productId, qty: 1 });
    } else {
      if (action === "add") {
        cart.products[productIndex].qty += 1;
      }
      if (action === "substract") {
        cart.products[productIndex].qty -= 1;
        if (cart.products[productIndex].qty === 0) {
          cart.products.splice(productIndex, 1);
        }
      }
      if (action === "remove") {
        cart.products.splice(productIndex, 1);
      }
    }

    await cart.save();
    return res.json({
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
    });
  }
});

router.post("/cart/buy", authenticate, async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await cartModel
      .findOne({ user: userId })
      .populate("products.id")
      .lean();

    let price = 0;

    cart.products.forEach((product) => {
      price += product.id.qty * product.id.price;
    });

    const wallet = await walletModel.findOne({ user: userId }).lean();

    if (wallet.balance < price) {
      return res.status(400).json({
        success: false,
        message: "Insufficient funds",
      });
    } else {
      wallet.balance -= price;
      await wallet.save();

      cart.products = [];
      await cart.save();
    }

    return res.json({
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
    });
  }
});

export default router;
