import express from 'express'
import { createbook } from './bookController.js';


 const bookRouter = express.Router();

 bookRouter.post("/create", createbook)




 export default bookRouter;