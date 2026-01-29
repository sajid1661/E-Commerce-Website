import mongoose from "mongoose"

const connectDB= async ()=>{
    mongoose.connection.on('connected',()=>{
        const logger = require('../logger');
logger.info('Database Connected');
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`);
}

export default connectDB;