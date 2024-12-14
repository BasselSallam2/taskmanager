const express = require('express');
const IsAuth = require('../middleware/auth');
const authController = require('../Controller/auth') ;
const {body} = require('express-validator') ;
const User = require('../Moduler/user') ;


const router = express.Router();


router.post('/login'  , authController.POSTlogin) ;

router.post('/signup' ,[
    body('email')
    .isEmail()
    .withMessage('not valid email')
    .custom((value , {req}) => {
        return User.findOne({email : value}).then((UserMail) => {
            if(UserMail) {
                return Promise.reject('E-Mail address already exists!');
            }
        })
    }).toLowerCase() ,
    body('password')
    .trim()
    .isLength({min : 5}) ,
    body('name')
    .trim()
    .not()
    .isEmpty().withMessage('Enter Name') ,
    body('department')
    .trim()
    .not()
    .isEmpty().withMessage('Enter department') 
] ,authController.postSignup ) ;







module.exports = router ;