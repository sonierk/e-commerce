import path from 'path'
import ProductModel from '../models/product.model.js';

export default class ProductController {

    getProducts(req, res){
        let products = ProductModel.get()
        // console.log(products);
        // console.log(path.resolve());
        // return res.sendFile(path.join(path.resolve(),"src","views","products.html"))
        return res.render('products',{products:products})
    }

    getAddForm(req,res){

        return res.render('new-product',{errorMessage:null})
    }

    addNewProduct(req,res,next){
        const {name,desc, price} = req.body
        const imageUrl = 'images/'+req.file.filename
        console.log(imageUrl);
        
        ProductModel.add(name,desc, price,imageUrl)
        let products = ProductModel.get()
        return res.render('products',{products:products})
    }

    getUpdateProductView(req,res,next){

        //1.  If product exit then return view else  
        const {id} = req.params
        const productFound = ProductModel.getById(id)
        if(productFound){
            return res.render('update-product',{product: productFound,errorMessage:null})
        }
        // 2. else error
        else{
            return res.status(401).send('Product not found')
        }
    }

    postUpdateProduct(req,res,next){
        ProductModel.update(req.body)
        var products = ProductModel.get()
        return res.render('products.ejs',{products:products})
    }

    deleteProduct(req,res, next){
        const id = req.params.id
        const productFound = ProductModel.getById(id)
        if(!productFound){
            
            return res.status(401).send('Product not found')
        }

        ProductModel.delete(id)
        var products = ProductModel.get()
        res.render('products',{products:products})
    }
}