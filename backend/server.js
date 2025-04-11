import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDb from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';



//App config
const app=express();
const PORT=process.env.PORT||4000;
connectDb();
connectCloudinary();


//middlewares

app.use(express.json());
app.use(cors());


//API endpoints

app.get('/',(req,res)=>{
    res.send('API working');
})
app.use('/api/user',userRouter);
app.use('/api/product',productRouter);
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter);


//Server connection
app.listen(PORT,()=>{
    console.log("SERVER initialised on port "+ PORT);
})