import express, { urlencoded } from 'express'
import ProductController from './src/controllers/product.controller.js'
import UserController from './src/controllers/user.controller.js'
import path from 'path'
import ejsLayouts from 'express-ejs-layouts'
import { urlToHttpOptions } from 'url'
import validationMiddleware from './src/middlewares/validation.middleware.js'
import { uploadFile } from './src/middlewares/file-upload.middleware.js'


const server = express()

server.use(express.static('public'))

//Parse form data
server.use(express.urlencoded({extended: true}))
//Setup view engine settings
server.set('view engine', 'ejs')
server.set('views',path.join(path.resolve(),'src','views'))

server.use(ejsLayouts)

const productController = new ProductController()
const userController = new UserController()
server.get('/',productController.getProducts)
server.get('/new',productController.getAddForm)
server.post('/',uploadFile.single('imageUrl'),validationMiddleware,productController.addNewProduct)
server.get('/update-product/:id',productController.getUpdateProductView)
server.post('/delete-product/:id',productController.deleteProduct)
server.post('/update-product',validationMiddleware,productController.postUpdateProduct)

server.get('/register',userController.getRegister)
server.get('/login',userController.getLogin)
server.post('/register',userController.postRegister)
server.post('/login',userController.postLogin)


server.listen(3300,()=>{
    console.log('server listening on port 3300');
})