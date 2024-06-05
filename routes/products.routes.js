
import {Router} from 'express'
import productModel from '../models/product.js'
import { authenticate } from '../middlewares/auth.js'
const router = Router()


router.post('/products', authenticate, async(req, res) => {
    const {name, price, stock, image} = req.body
    const newProduct = new productModel({
        name,
        price,
        stock,
        image
    })
    await newProduct.save()
    res.redirect('/admin')
})

router.post('/products/:id', async(req, res) => {
    const {name, price, stock, image} = req.body
    const id = req.params.id
    const updatedProduct = await productModel.findByIdAndUpdate(id, {
        name,
        price,
        stock,
        image
    }, {new:true})
    
    res.redirect('/admin')
})



export default router