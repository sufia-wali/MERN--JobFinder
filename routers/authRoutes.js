const express = require('express')
const router = new express.Router()
const { register, login, updateUser } = require("../controllers/authController.js");
const authenticateUser = require('../middleware/auth.js')


router.post('/register',register)
router.post('/login', login)
router.patch('/updateUser',authenticateUser, updateUser)


module.exports = router