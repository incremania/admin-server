const express = require('express');
const router = express.Router()
const {
    createUser,
    getAllUser,
    pauseTools,
    resumeTools
} = require('../controllers/userController')

router
.post('/register', createUser)
.get('/users', getAllUser)
.patch('/pause/:user_name', pauseTools)
.patch('/resume/:user_name', resumeTools)



module.exports = router