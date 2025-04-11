import orderModel from "../models/orderModel.js";
import userModel from '../models/orderModel.js';
import Stripe from 'stripe';


//Global variables

const currency='usd'
const deliveryCharge= 10;

//Gateway inititalization
const stripe=new Stripe(process.env.STRIPE_SECRET_KEY);

//Placing orders using COD
const placeOrder=async (req,res)=>{
    try {
        const {userId,items,amount,address}=req.body;

        const orderData={
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment:false,
            date:Date.now(),
        }

        const newOrder=new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId,{cartData:{}});
        
        res.json({sucess:true,message:"Order placed"})

    } catch (error) {
        console.log(error);
        res.json({sucess:false,message:error.message});
    }
}


//Placing orders using stripe
const placeOrderStripe=async (req,res)=>{
    try {

        const {userId,items,amount,address}=req.body;
        const {origin}=req.headers;

        const orderData={
            userId,
            items,
            address,
            amount,
            paymentMethod:"Stripe",
            payment:false,
            date:Date.now(),
        }

        const newOrder=new orderModel(orderData);
        await newOrder.save();

        const line_items=items.map((item)=>({
            price_data:{
                currency:currency,
                product_data:{
                    name:item.name,
                },
                unit_amount: item.price*100,
            },
            quantity:item.quantity
        }))
        line_items.push({
            price_data:{
                currency:currency,
                product_data:{
                    name:"Delivery Fee",
                },
                unit_amount: deliveryCharge*100,
            },
            quantity:1
        })


        const session=await stripe.checkout.sessions.create({
            success_url:`${origin}/verify?success=true&orderid=${newOrder._id}`,
            cancel_url:`${origin}/verify?success=false&orderid=${newOrder._id}`,
            line_items,
            mode:'payment',
        })
        res.json({sucess:true,session_url:session.url});
    } catch (error) {
        console.log(error);
        res.json({sucess:false,message:error.message});
    }
}

//Verify stripe
const verifyStripe=async (req,res)=>{
    const {orderId,success,userId}=req.body;

    try {
        if(success==='true'){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            await userModel.findByIdAndUpdate(userId,{cartData:{}});
            res.json({sucess:true});
        }else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({sucess:false});
        }
    } catch (error) {
        console.log(error);
        res.json({sucess:false,message:error.message});
    }
}


//Placing orders using razorpay
const placeOrderRazorpay=async (req,res)=>{
    
}


// all orders data for admin panel

const allOrders=async (req,res)=>{
    try {
        
        const orders=await orderModel.find({});

        res.json({sucess:true,orders})

    } catch (error) {
        console.log(error);
        res.json({sucess:false,message:error.message})
    }
}


// all orders data for particular user panel
const userOrders=async (req,res)=>{
    try {
        
        const {userId}=req.body;
        
        const orders=await orderModel.find({userId});

        res.json({sucess:true,orders})

    } catch (error) {
        console.log(error);
        res.json({sucess:false,message:error.message})
    }
}


//update order status from Admin panel
const updateStatus=async (req,res)=>{
    try {
        
        const {orderId,status}=req.body;
        await orderModel.findByIdAndUpdate(orderId,{status});
        res.json({sucess:true,message:"Status updated sucessfully"})

    } catch (error) {
        console.log(error);
        res.json({sucess:false,message:error.message})
    }
}

export {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus,verifyStripe}