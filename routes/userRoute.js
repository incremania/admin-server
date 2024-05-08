const express = require('express');
const router = express.Router()
const {
    createUser,
    getAllUser,
    pauseTools,
    resumeTools,
    updateMachineName
} = require('../controllers/userController')


router
.post('/register', createUser)
.get('/users', getAllUser)
.post('/update-machine', updateMachineName)
.patch('/pause', pauseTools)
.patch('/resume', resumeTools)



module.exports = router