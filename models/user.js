const mongoose=require("mongoose");

const userschema=new mongoose.Schema({
    userid:{
        type:String,
        require:true,
    },
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    mobile:{
        type:Number,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
},{timestamps:true});

const User = mongoose.model('User',userschema);

module.exports=User;