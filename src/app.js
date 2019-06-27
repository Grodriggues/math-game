const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("../src/db/mongodb");

const User = require("../src/models/users");

const path = require("path");

const public = path.join(__dirname,"../public");

app.use(express.static(public));
app.use(express.json());

app.post("/users", async(req,res) =>{
    const user = new User(req.body);
    try{
        await user.save();
        res.send().status(201);
    }catch(e){
        res.send({"error":"an error occured"}).status(400);
    }
    
});

app.get("/records" , async(req,res) =>{
    const user = await User.find().sort({bestTime:1}).limit(6) // return the six faster players
    res.send(user);
}); 


app.listen(3000, () => console.log("run"))
