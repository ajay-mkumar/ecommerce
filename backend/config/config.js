import mongoose from "mongoose";

const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGODB_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true});
        console.log("mongo connected");
    }catch(err){
        console.log(`error:${err.message}`)
        process.exit(1);
    }
}

export default connectDB;