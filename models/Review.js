const mongoose = require('mongoose');

const bookingSchema=new mongoose.Schema({
    agentid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:travelagents,
        require:true,
     },
     rating: {
        type: Number,
        default:3,
        min: 1,
        max: 5,
      },
      review:{
        type:String,
      },
      createdAt: {
        type: Date,
        default: Date.now
    },
});