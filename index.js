import express, { urlencoded } from 'express'
import ProductController from './src/controllers/product.controller.js'
import path from 'path'
import ejsLayouts from 'express-ejs-layouts'
import { urlToHttpOptions } from 'url'
import validationMiddleware from './src/middlewares/validation.middleware.js'

const server = express()

//Parse form data
server.use(express.urlencoded({extended: true}))
//Setup view engine settings
server.set('view engine', 'ejs')
server.set('views',path.join(path.resolve(),'src','views'))

server.use(ejsLayouts)

const productController = new ProductController()
server.get('/',productController.getProducts)
server.get('/new',productController.getAddForm)
server.post('/',validationMiddleware,productController.addNewProduct)
server.get('/update-product/:id',productController.getUpdateProductView)

server.listen(3300,()=>{
    console.log('server listening on port 3300');
})