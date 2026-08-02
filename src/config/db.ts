
import { config } from './config.js'
import mongoose from 'mongoose'


const connectDB = async ()=>{
try{
   mongoose.connection.on("connected" ,()=>{
    console.log("connected to database successfully");
  });


  mongoose.connection.on("error" , (err)=>{
    console.log("error to connect database" , err)
  })
  await mongoose.connect(config.dbURL as string)

 
}

catch(err){
  console.error("failed to connect database" , err)
  process.exit(1);
}

}

export default connectDB