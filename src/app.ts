import { config } from './config/config.js';
import express  from 'express';

import createHttpError from 'http-errors';
import globalErrorHandler from './middlewares/globalerrorhandler.js';

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
 
  const error = createHttpError(400,"something went wrong");
  throw error;

  res.json({ message: "welcome bro" });

});

//global error handler
app.use(globalErrorHandler);



export default app;

