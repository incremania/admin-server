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
.patch('/pause', pauseTools)
.patch('/resume', resumeTools)



module.exports = router