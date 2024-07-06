const mongoose=require('mongoose');
const {Schema}=mongoose;
const orderSchema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    order_data:{
        type:Array,
        required:true
    }
})
//orders is the name of the collection in which the data is stored in the form of documents
module.exports=mongoose.model("order",orderSchema);
