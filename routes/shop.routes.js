import { Router } from "express";
import productModel from "../models/product.js";
import { authenticate } from "../middlewares/auth.js";
import cartModel from "../models/cart.js";
const router = Router();

router.get("/shop", authenticate, async (req, res) => {
  const products = await productModel.find();
  res.render("products", { products });
});

router.get('/cart', authenticate, async(req, res) => {
    const userId = req.user.id  
    const userCart = await cartModel.findOne({ user:userId }).populate('products.id')
    console.log(userCart)
    res.render('cart', { cart: userCart })
})



export default router;
