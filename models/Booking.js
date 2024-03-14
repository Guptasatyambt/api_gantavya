const mongoose = require('mongoose');
const users=require('../models/user');
const travelagents=require('../models/Agent');

const bookingSchema=new mongoose.Schema({

    userid:{
        type: String,
        require:true,
     },
     travelid:{
        type:String,
        require:true,
     },
     fromDate:{
        type:Date,
        require:true,
       },
       toDate:{
        type:Date,
        require:true,
       },
       city:{
        type:String,
        require:true,
       },
       personCount:{
       type:Number,
       default:1,
       },
       createdAt: {
        type: Date,
        default: Date.now
    },

},{timestamps:true});

const Booking = mongoose.model('Booking',bookingSchema);

module.exports=Booking;