const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModels');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Obtener el token
      token = req.headers.authorization.split(' ')[1];

      // Verificar la forma del token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Obtener los datos del usuario del payload del token y lo vamos a poner en un objeto
      req.user = await User.findById(decoded.idusuario).select('-password');

      // Verificar si el usuario es administrador
      if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Acceso denegado. Solo los administradores pueden realizar esta acción.' });
      }

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Acceso no autorizado');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Acceso no autorizado, no se proporcionó un token');
  }
});

module.exports = {
  protect
};
