import mongoose from "mongoose";
import colors from 'colors';

const connectDB= async ()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI,);
        console.log('connected to DB Successfully'.bgMagenta.white)
    } catch (error) {
        console.log(`error in mongodb ${error}`.bgRed.black)
        
    }
}

export default connectDB;