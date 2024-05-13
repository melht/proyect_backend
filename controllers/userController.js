const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModels')
const expressAsyncHandler = require('express-async-handler')

const generarToken = (idusuario) => {
    return jwt.sign({idusuario},process.env.JWT_sECRET, {
        expiresIn: '30d'
    })
}

const registrar = asyncHandler(async(req,res) => {
    //desestrcutrar un objeto
    const {name, email, password,birthday} = req.body

    //verificar el paso de los datos
    if(!name || !email ||!password|| !birthday){
        res.status(400)
        throw new Error('FALTAN DATOS ')
    }

    //verificar que el usuario
    const userExiste = await User.findOne({email})
    if(userExiste){
        res.status(400)
        throw new Error('ese user ya  existe en al base de datos ')
    }
    
    //hacemos el hash
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    //crear el usario
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        birthday

    })

    res.status(201).json(user)

})

const login =asyncHandler(async (req, res) => {

    //desestructuramos los datos
    const {email, password} = req.body

    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            id : user.id,
            name: user.name,
            email: user.email,
            token: generarToken(user.id)

    })
    }else {
        res.status(401)
    }
})

const showdata = asyncHandler(async(req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
});

const updateUsuario = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

   
    const updates = {};
    if (req.body.name) updates.name = req.body.name;
    if (req.body.email) updates.email = req.body.email;
    if (req.body.isAdmin) updates.isAdmin = req.body.isAdmin;

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, { new: true });

    res.status(200).json({
        message: `User ${req.params.id} updated successfully`,
        data: updatedUser
    });
});

const deleteUsuario = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    await User.deleteOne({ _id: req.params.id });

    res.status(200).json({ id: req.params.id, message: 'User deleted successfully' });
});

module.exports = {
    registrar, 
    login,
    showdata,
    updateUsuario,
    deleteUsuario
}
