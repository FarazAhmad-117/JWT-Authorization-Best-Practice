import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username:{
        type:String,
        unique:true,
        trim:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        trim:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
},{
    timestamps:true
})

const User = new mongoose.model('User',userSchema);

export default User;

