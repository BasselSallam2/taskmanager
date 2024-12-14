const mongoose = require('mongoose') ;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name : {
        type : String ,
        required : true ,
        unique: true
    } ,
    password : {
        type : String ,
        required : true 
    } ,
    image : {
        type : String ,
        required : false
    } ,
    email : {
        type : String ,
        required : true ,
        unique : true 
    } ,
    role : {
        type : String , 
        required : true ,
        default: 'New User'
    } ,
    department : {
        type : String ,
        required : true 
    } ,
    tasks : [{
        type : Schema.Types.ObjectId ,
        ref : 'tasks'
    }]
});


module.exports = mongoose.model('User', UserSchema);