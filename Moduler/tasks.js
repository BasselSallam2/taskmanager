const mongoose = require('mongoose') ;
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title : {
        type : String ,
        required : true 
    } ,
    createdBy : {
        type : Schema.Types.ObjectId ,
        ref : 'User'
    } ,
    createdTo : {
        type : Schema.Types.ObjectId ,
        ref : 'User'
    } ,
    deadline : {
        type : Date 
    } ,
    state : {
        type : String ,
        default : 'In Progress'
    } , 
    description : {
        type : String
    }

} , { timestamps: true } )

module.exports = mongoose.model('tasks' , TaskSchema );


