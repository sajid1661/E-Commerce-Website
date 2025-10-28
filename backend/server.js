import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';

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
app.get('/',(req,res)=>{
    res.send('Api working');
})

app.listen(port,()=> console.log(`Server started on PORT: ${port}`));