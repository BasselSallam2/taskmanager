const mongoose = require('mongoose') ;
const Schema = mongoose.Schema;


const DapartmentSchema = new Schema({
    department : {
        type : String ,
        required : true 
    } ,
    users : [ {
        type : Schema.Types.ObjectId ,
        ref : 'User' 
    }]
})


module.exports = mongoose.model('Department' , DapartmentSchema );


