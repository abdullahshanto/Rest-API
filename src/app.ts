import express from 'express' 

const app = express();

app.get("/" ,(req,res,next)=>{
  res.json({"message": "welcome bro"})
})



export default app;

