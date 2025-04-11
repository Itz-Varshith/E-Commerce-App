import userModel from '../models/userModel.js'
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createToken= (id)=>{
    return  jwt.sign({id},process.env.JSON_SECRET_KEY);
}


//Route for user login
const loginUser=async(req,res)=>{
    try {
        const {email,password}=req.body;
        //Checking if user exists or not
        const user=await userModel.findOne({email});
        if(!user){
            return res.json({sucess:false,message:"User does not exist"});
        }

        //Checking for correct password
        const isMatch=await bcrypt.compare(password,user.password);
        if(isMatch){
            const token=createToken(user._id);
            return res.json({sucess:true,token});
        }
        else{
            return res.json({sucess:false,message:"Invlaid credentials"});
        }

    } catch (error) {
        console.log(error);
       return res.json({sucess:false,message:error.meassage});
    }
}

//Route for user signup

const registerUser=async (req,res)=>{
    try {
        const {name,email,password}=req.body;

        //Check for if user exists or not
        const userExist=await userModel.findOne({email:email});
        if(userExist){
            return res.send({sucess:false ,message:"User already exists"});
        }

        //Checking for strong password
        if(!validator.isEmail(email)){
            return res.json({sucess:false,message:"Please use a valid email"})
        }
        if(password.length<8){
            return res.json({sucess:false,message:"Please enter a password with more than 8 characters"});
        }

        //hashing user password 
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        //Creating user

        const user = await userModel.create({
            name,
            email,
            password: hashedPassword,
        });
        


        //generating token
        const token=createToken(user._id);

        return res.json({sucess:true,token});

    } catch (error) {
        console.log(error);
        return res.json({sucess:false,message:error.message});
    }
}

//Route for Admin login

const adminLogin=async (req,res)=>{

    try {

        const {email,password}=req.body;
        if (email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD) {
            const token=jwt.sign(email+password,process.env.JSON_SECRET_KEY)

        return res.json({sucess:true,token});
        } else {
            return res.json({sucess:false,message:"Invalid credentials"});
        }
        
    } catch (error) {
        console.log(error);
        return res.json({sucess:false,message:error.message});
    }


}

export {loginUser,registerUser,adminLogin};