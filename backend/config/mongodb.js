import mongoose from 'mongoose';

const connectDb=async ()=>{

    mongoose.connection.on('connected',()=>{
        console.log("Mongodb connected");
    })

    await mongoose.connect(`${process.env.MONGODB_URI}/E-CommerceApp`);
}

export default connectDb;