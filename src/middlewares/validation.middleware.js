import {body, validationResult} from 'express-validator'
const validationRequest = async (req,res,next)=>{
    //Validate data
    // const {name,desc,price,imageUrl} = req.body
    // let errors = []
    // if(!name || name.trim()==''){
    //     errors.push('Name is required')
    // }
    // if(!price || parseFloat(price)<1){
    //     errors.push('Price must be positive value')
    // }
    // try {
    //     const validUrl = new URL(imageUrl)
    // } catch (error) {
    //     errors.push('URL is invalid')
    // }

    // Express Validator middleware
    // 1. Setup rules for validation
    const rules= [
        body('name').notEmpty().withMessage("Name is requried"),
        body('price').isFloat({gt:0}).withMessage("Price should be positive value"),
        body('imageUrl').isURL().withMessage("Invalid url")
    ]
    // 2. Run those rules.
    await Promise.all(rules.map(rule=> rule.run(req)))

    // 3. Check if there are any errors after running the rules.
    var validationErrors = validationResult(req)

    if(!validationErrors.isEmpty()){
        return res.render('new-product',{errorMessage:validationErrors.array()[0].msg})
    }
    next();
}

export default validationRequest