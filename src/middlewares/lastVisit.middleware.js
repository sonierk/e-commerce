export const setLastVisit = (req,res,next)=>{
    // 1. if cookie is set, then add  a local variable with last visit time data.
    
    
    
    if(req.cookies.lastVisit){
        res.locals.lastVisit = new Date(req.cookies.lastVisit).toLocaleString()
    }
    // Add the 'lastVisit' property in the cookie and sent it to the client side where the client can access if from locals.lastVisit variable
    res.cookie('lastVisit', new Date().toISOString(),{
        maxAge: 2*24*60*60*1000
    })
    

    next()
}