// const mongoose=require("mongoose")


// const connectDB=async ()=>{
//     try{
//         const mongouri=process.env.MONGO_URI
//         await mongoose.connect(mongouri)
//     }catch(error){
//         console.log("mongodb connection string error")
//     }
// }


const mongoose=require("mongoose")


const connectDB=async()=>{
    try{
        const mongouri=process.env.MONGO_URI
        await mongoose.connect(mongouri)
        console.log("db connected")
    }catch(error){
        console.log("mongodb connection string error")
    }
}

module.exports=connectDB