const express=require("express");
const app=express();
const port=5000;
const mongobd=require('./db');
mongobd();
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers", 
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})
app.use(express.json());
app.use("/api",require("./Routes/CreateUser"));//For signup and login user endpoints
app.use("/api",require("./Routes/DisplayData"));//For displaying data on home screen 
app.use("/api",require("./Routes/OrderData"));//For storing the orders data on checkout from cart
app.use("/api",require("./Routes/MyOrderData"));//For getting my orders on clicking my orders in navbar
app.get("/",(req,res)=>{
    res.send("<h1>Hello World</h1>");
})
app.listen(port,()=>{
    console.log(`Server running in port ${port}!`);
})