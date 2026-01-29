import mongoose from "mongoose"
import logger from '../logger.js';

const connectDB= async ()=>{
    mongoose.connection.on('connected',()=>{
        logger.info('Database Connected');
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`);
}

export default connectDB;