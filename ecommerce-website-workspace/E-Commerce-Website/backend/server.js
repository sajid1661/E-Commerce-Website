import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRoute from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import logger from './logger.js';

// App Config

const app= express();
const port= process.env.PORT || 4000;

// Database connection
connectDB();

// Cloudinary connection
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cors());

// api endpoints

app.use('/api/user',userRouter);
app.use('/api/product',productRouter);
app.use('/api/cart',cartRoute);
app.use('/api/order',orderRouter);
app.get('/',(req,res)=>{
    res.send('Api working');
});

app.listen(port, () => logger.info(`Server started on PORT: ${port}`));