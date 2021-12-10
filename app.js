const express = require('express');
const app=express();

const mongoose=require("mongoose");


const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://user:user@cluster0.8lkmp.mongodb.net/vaccinatedUsers?retryWrites=true&w=majority");
mongoose.connection.on('error',err=>{
    console.log("connection failed...");
});
mongoose.connection.on("connected",connected=>{
    console.log("Connected Database!");
});



const userRoute=require("./controller/user")
app.use('/users',userRoute);

const adminRoute=require("./controller/admin");
app.use("/Admin",adminRoute)

app.use((req,res,next)=>{
    res.status(404).json({
        message:"Url Not Found"
    })
})


module.exports=app;
