import jwt from 'jsonwebtoken';


const adminAuth=async (req,res,next)=>{
    try {
        const {token}=req.headers;
        if(!token){
            return res.json({sucess:false,message:"User not authorised"});
        }else{
            const tokenDecoded= jwt.verify(token,process.env.JSON_SECRET_KEY);
            if(!tokenDecoded===process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
                return res.json({sucess:false,message:"User not authorised"});
            }
            next();
        }
    } catch (error) {
        console.log(error);
        return res.json({sucess:false,message:error.message});
        
    }
}


export default adminAuth;