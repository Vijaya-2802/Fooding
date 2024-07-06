const express = require('express');
const router = express.Router();
router.post("/displaydata",(req,res)=>{
    try{
        //console.log(global.foodData)
        res.send([global.foodData,global.foodCategories])//Send it as an array
    }
    catch(err){
        console.error(err);
        res.send(err.message);
    }
})

module.exports=router;