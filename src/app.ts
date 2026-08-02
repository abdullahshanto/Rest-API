import { config } from './config/config.js';
import express  from 'express';

import globalErrorHandler from './middlewares/globalerrorhandler.js';
import userRouter from '../user/userRouter.js';

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
 
  res.json({ message: "welcome bro" });

});


//routes ahndling
app.use("/api/users/", userRouter)

//global error handler
app.use(globalErrorHandler);



export default app;

