const express = require('express')
const router = express.Router()

const { protect } = require('../middleware/authMiddleware')
const { login, registrar,showdata, updateUsuario ,deleteUsuario} = require('../controllers/userController')

router.get('/login', login)
router.post('/registrar',registrar)
router.put('/:id', updateUsuario)
router.delete('/:id', deleteUsuario)
router.get('/data', showdata)

module.exports = router