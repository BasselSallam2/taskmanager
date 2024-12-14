const User = require('../Moduler/user') ;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator') ;



exports.POSTlogin = (req , res , next) => {
const email = req.body.email ;
const password = req.body.password ;
let loadedUser;
User.findOne({email : email})
.then((user) => {
    if(!user) {
        const error = new Error('A user with this email could not be found.');
        error.statusCode = 401;
        throw error;
    }
    loadedUser = user ;
    return bcrypt.compare(password, user.password);
}).then((isEqual) => {
    if (!isEqual) {
        const error = new Error('Wrong password!');
        error.statusCode = 401;
        throw error;
    }
    const token = jwt.sign(
        {
        email: loadedUser.email,
        userId: loadedUser._id.toString()
        },'SuperSecret'
    );

          // Set the token in the cookie
        res.cookie('token', token, {
            httpOnly: true, // This makes the cookie inaccessible to JavaScript
            secure: process.env.NODE_ENV === 'production', // Set to true if you're using https
            maxAge: 3600000, // Cookie expires after 1 hour (1 hour = 3600000 milliseconds)
        });
    

        res.status(200).json({ token: token, userId: loadedUser._id.toString() });
})
.catch(err => {
    if (!err.statusCode) {
        err.statusCode = 500;
    }
    next(err);
});

};


exports.postSignup = (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const name = req.body.name ;
    const email = req.body.email;
    const password = req.body.password;
    const department = req.body.department ;
    bcrypt
    .hash(password, 12)
    .then(hashedPw => {
    const user = new User({
        email: email,
        password: hashedPw,
        name: name,
        department : department 
    });
    return user.save() ;
    }).then(result => {
        res.status(201).json({ message: 'User created!', userId: result._id });
    }).catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err) ;
    });
};