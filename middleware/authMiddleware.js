const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModels');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Obtener el token y verificar el formato
      token = req.headers.authorization.split(' ')[1];

      // Verificar el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Obtener el usuario desde la base de datos
      const user = await User.findById(decoded.idusuario).select('-password');

      // Verificar si el usuario existe y es administrador
      if (!user || !user.isAdmin) {
        return res.status(403).json({ message: 'Acceso denegado. Solo los administradores pueden realizar esta acción.' });
      }

      // Si todo está bien, pasar al siguiente middleware
      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Acceso no autorizado. Token inválido.' });
    }
  }

  // Manejar el caso en que no se proporciona un token
  if (!token) {
    res.status(401).json({ message: 'Acceso no autorizado, no se proporcionó un token' });
  }
});

module.exports = {
  protect
};
