// const express=require("express")
// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");
// const { signJwt } = require("./jwt");

// dotenv.config();

// const app = express();
// app.use(express.json()); 


// const userSchema = new mongoose.Schema({
//     username: { type: String, required: true, unique: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true }
// });

// const User = mongoose.model("User", userSchema);

// app.post("/signup",  async(req,res)=>{
//     const {username,email,password}=req.body
//     try{
//         let user=await User.findOne({email})
//         if(user){
//             return res.status(400).send("user already exists")
//         }
//         const hashedPassword=await bcrypt.hash(password,10)
//         user=new User({username,email,password:hashedPassword})
//         await user.save()
//         const token=signJwt({id:user._id,username:user.username})
//          res.status(201).send({ message: "User registered successfully", token });
//     }catch(error){
//         res.status(500).send("error")
//     }
    
// })

// app.post("/login",async(req,res)=>{
    
// })



// app.listen(3000,()=>{
//     console.log("port running on 3000")
// })



const express=require("express")
const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const dotenv=require("dotenv")
const { signJwt } = require("./jwt")
const connectDB = require("./connectDB")


const app=express()
app.use(express.json())


connectDB()
const userSchema=new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}

})
const User=mongoose.model("user",userSchema)
app.post('/signup',async(req,res)=>{
    const {username,email,password}=req.body
    try{
        let user=await User.find({email})
        if(user){
            return res.status(400).json("user already exists")
        }
        const hashpassword=await bcrypt.hash(password,10)
        user=new User({username,email,hashpassword})

        await user.save()
        const token=signJwt({id:user._id,username:user.username})
        return res.status(200).json({message:"user registered successfully",token})
    }catch(error){
        res.status(500).send("error")
    }

})


app.post("/login",async(req,rs)=>{
    const {email,password}=req.body
    try{
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json("invalid email or password")
        }
        const isMath=await bcrypt.comapre(password,user.password)
        if(!isMath){
            return res.status(400).json("invalid email or password")

        }
        const token=signJwt({id:user._id,username:user.username})
        return res.status(200).json({message:"user registered successfully",token})
    }catch(error){
        res.status(500).send("Error logging in")
    }
})


app.listen(3000,()=>{
    console.log("port is running on 3000")
})


