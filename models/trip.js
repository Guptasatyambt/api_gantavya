const mongoose=require("mongoose");
const hotels=require('./Hotel')
const rooms=require('./rooms')
const agent=require('./Agent')
const user=require('./user')

const tripchema=new mongoose.Schema({
    hotelid:{
       type: mongoose.Schema.Types.ObjectId,
       ref: hotels
    },
   roomid:{
    type: mongoose.Schema.Types.ObjectId,
    ref: rooms
   },
   userid:{
    type: mongoose.Schema.Types.ObjectId,
    ref: user
   },
   agentid:{
    type: mongoose.Schema.Types.ObjectId,
    ref: agent
   },
   fromDate:{
    type:Date
   },
   toDate:{
    type:Date
   }
 },{timestamps:true})
  
 const Trip = mongoose.model('trip',tripchema);
 
 module.exports=Trip;