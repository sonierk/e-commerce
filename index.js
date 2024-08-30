import express, { urlencoded } from 'express'
import ProductController from './src/controllers/product.controller.js'
import UserController from './src/controllers/user.controller.js'
import path from 'path'
import ejsLayouts from 'express-ejs-layouts'
import cookieParser from 'cookie-parser'
import { setLastVisit } from './src/middlewares/lastVisit.middleware.js'
import { urlToHttpOptions } from 'url'
import validationMiddleware from './src/middlewares/validation.middleware.js'
import { uploadFile } from './src/middlewares/file-upload.middleware.js'
import { auth } from "./src/middlewares/auth.middleware.js"

import session from 'express-session'


const server = express()

server.use(express.static('public'))
server.use(cookieParser())

// server.use(setLastVisit)
server.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized:true,
    cookie: {secure: false},
}))

//Parse form data
server.use(express.urlencoded({extended: true}))
//Setup view engine settings
server.set('view engine', 'ejs')
server.set('views',path.join(path.resolve(),'src','views'))

server.use(ejsLayouts)

const productController = new ProductController()
const userController = new UserController()
server.get('/',setLastVisit,auth,productController.getProducts)
server.get('/new',auth,productController.getAddForm)
server.post('/',auth,uploadFile.single('imageUrl'),validationMiddleware,productController.addNewProduct)
server.get('/update-product/:id',auth,productController.getUpdateProductView)
server.post('/delete-product/:id',auth,productController.deleteProduct)
server.post('/update-product',auth,validationMiddleware,productController.postUpdateProduct)

server.get('/register',userController.getRegister)
server.get('/login',userController.getLogin)
server.post('/register',userController.postRegister)
server.post('/login',userController.postLogin)
server.get('/logout',userController.logout)


server.listen(3300,()=>{
    console.log('server listening on port 3300');
})