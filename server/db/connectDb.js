import mongoose from 'mongoose';
import { config } from 'dotenv';
config();

const connectDb = async()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL)
        if(connect){
            console.log('Mongo db connected at ',connect.connection.host);
        }
    } catch (error) {
        console.log('Error connecting database!');
        process.exit(1);
    }
}

export default connectDb;