const express = require('express')
const router = express.Router()

const { protect } = require('../middleware/authMiddleware')
const { login, registrar,showdata } = require('../controllers/userController')

router.get('/login', login)
router.post('/register', registrar)
router.put('/:id', updateTareas)
router.get('/data',protect, showdata)

module.exports = router