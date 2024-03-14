const mongoose=require("mongoose");
const hotels=require('./Hotel')

const Roomschema=new mongoose.Schema({
   title:{
    type:String,
    require:true,
   },
   price:{
    type:Number,
    require:true
   },
   maxpeople:{
    type:Number,
    require:true
   },
   desc:{
    type:String,
    require:true
   },
   hotelid:{
      type: mongoose.Schema.Types.ObjectId,
      ref: hotels
   },
   roomnumber:[{number:Number ,unavailabledates:{type:[Date]}}],
},{timestamps:true})

const Room = mongoose.model('Room',Roomschema);

module.exports=Room;