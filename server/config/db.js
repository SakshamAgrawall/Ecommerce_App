import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI,);
        console.log('connected to DB Successfully')
    } catch (error) {
        console.log(`error in mongodb ${error}`)

    }
}

export default connectDB;