const express=require("express");
const app=express();
const mongoose=require("mongoose");
app.listen(8080,() =>{
    console.log("Sever run at 8080");
})
app.get("/",(req,res)=>{
 res.send("Hi this working");
})