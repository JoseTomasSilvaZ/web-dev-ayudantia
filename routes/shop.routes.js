import {Router} from 'express'
import { authenticate } from '../middlewares/auth.js'
import productModel from '../models/product.js'
import cartModel from '../models/cart.js'

const router = Router()


router.get('/shop', authenticate, async(req, res) => {
    const products = await productModel.find()
    res.render('shop', {products})
})

router.get('/cart', authenticate, async(req, res) => {
    const userId = req.user.id
    const cart = await cartModel.findOne({user:userId}).populate('products.id')
   
    res.render('cart', {cart})
})


export default router