import path from 'node:path';
import multer from 'multer';
import express from 'express'
import { createbook } from './bookController.js';

 const bookRouter = express.Router();


 const upload = multer(
  {
     dest: path.resolve(__dirname, '../../public/uploads'),
     limits :{
       fileSize: 3e7 // 30MB
     } 
    
    
    }); // Specify the destination folder for uploaded files

 bookRouter.post("/", 
  
  upload.fields([{ name: 'coverImage', maxCount: 1 },
    {
      name: 'file', maxCount: 1
    }
  ]),createbook);

 export default bookRouter;
