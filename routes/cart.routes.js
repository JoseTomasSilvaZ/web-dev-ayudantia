import {Router} from 'express'
import { authenticate } from '../middlewares/auth.js'
import cartModel from '../models/cart.js'

const router = Router()


router.patch('/cart', authenticate, async(req, res) => {
    const userId = req.user.id
    const productId = req.body.productId

    const userCart = await cartModel.findOne({user: userId})

    const productIndex = userCart.products.findIndex(product => product.id.toString() === productId )

    if(productIndex !== -1) {
        userCart.products[productIndex].quantity += 1 
    } else {
        userCart.products.push({id: productId, quantity:1})
    }

    await userCart.save()

    return res.json({
        message: 'Product added to cart',
        cart: userCart
    })
})

router.delete('/cart/product/:productId', authenticate, async(req, res) => {
    const userId = req.user.id
    const productId = req.params.productId

    const userCart = await cartModel.findOne({user:userId})

    userCart.products = userCart.products.filter(product => product.id.toString() !== productId)

    await userCart.save()

    res.json({
        message:'Product deleted from cart',
        cart:userCart
    })
})


export default router