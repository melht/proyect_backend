const jwt = require('jsonwebtoken')
const asyncHandler= require('express-async-handler')
const user=require('../models/userModels')

const protect = asyncHandler(async(req,res, next )=> {

let token

if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try{
        //obtenemos el token
    token = req.headers.authorization.split(' ')[1]

         //verificar la forma del tokern
    const decoded = jwt.verify(token,process.env.JWT_SECRET)

    //Obtener los datos del usuario del payload del token y lo vamos a poner en un objeto
    req.user = await user.findById(decoded.idusuario).select('-password')

    next()
    } catch (error){
        console.log(error)
        res.status(401)
        throw new Error('acceso no autorizado')

    }

    
}
if(!token){
    res.status(401)
    throw new Error('acceso no autorizado , no se porpociono un toker')
}

})

module.exports = {
    protect
}