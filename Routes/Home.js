const express = require('express');
const isAuth = require('../middleware/auth') ;


const router = express.Router();
const UserController = require('../Controller/user') ;

router.get('/tasks' , isAuth , UserController.getTasks ) ;





module.exports = router;