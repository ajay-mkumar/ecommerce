import path from 'path';
import express from "express";
import dotenv from "dotenv";
import ProductRouter from './router/ProductRouter.js'
import UserRouter from './router/userRouter.js'
import { notFound,errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/config.js";
import cookieParser from "cookie-parser";
import OrderRouter from './router/orderRouter.js';
import UploadRouter from './router/uploadRoutes.js';
import CartRouter from './router/cartRouter.js'

dotenv.config();
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const port=5000;

connectDB();
 



app.use('/api/products',ProductRouter);
app.use('/api/users',UserRouter);
app.use('/api/order',OrderRouter);
app.use('/api/cart',CartRouter);
app.use('/api/upload',UploadRouter);

app.get('/api/config/paypal',(req,res)=>res.json({clientId:process.env.PAYPAL_CLIENT_ID}))

if (process.env.NODEENV === 'production') {
    const __dirname = path.resolve();
    app.use('/uploads', express.static('/var/data/uploads'));
    app.use(express.static(path.join(__dirname, '/frontend/build')));
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    );
  } else {
    const __dirname = path.resolve();
  app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
    app.get('/', (req, res) => {
      res.send('API is running....');
    });
  }

app.use(notFound);
app.use(errorHandler)
  

app.listen(port,()=>{
    console.log("server started...")
})