const mongoose=require('mongoose');
const {Schema}=mongoose;
const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        maxLength:30,
        required:true, 
        lowercase:true
    },
    password:{
        type:String,
        // minLength:8,
        required:true, 
    },
    location:{
        type:String,
        required:true, 
    },
    date: {
        type: Date, 
        default: Date.now 
    },
})
//user is the name of the collection in which the data is stored in the form of documents
module.exports=mongoose.model("user",userSchema);