import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js'
import catergoryRoute from './routes/categoryRoute.js';
import productRoute from './routes/productRoute.js';
import cors from "cors"

//confg
dotenv.config();

//connect db
connectDB()

// rest object
const app = express();

//middelware
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))


// routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/category', catergoryRoute)
app.use('/api/v1/product', productRoute)

//rest api
app.get("/", (req, res) => {
    res.send({
        message: "hello developers"
    });
})

//Port
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})